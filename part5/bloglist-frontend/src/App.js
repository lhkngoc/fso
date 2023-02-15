
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  const [newBlog, setNewBlog] = useState({
    title:'',
    author: '',
    url: '',
    likes:''
  })
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload(false)
  }

  const addBlog = (event) => {
    event.preventDefault()
    console.log("blog :",newBlog)
    const blogObject = {
      title:newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes:newBlog.likes
    }
    try {
      blogService
      .create(blogObject)
      .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setNewBlog({
          title:'',
          author: '',
          url: '',
          likes:''
      })
      })
      setErrorMessage(`a new Blog '${newBlog.title}' added`)
    }catch (exception) {
      setErrorMessage('Missing url or title')
      setTimeout(() => {
      setErrorMessage(null)
      }, 5000)
    }
    setTimeout(() => {
      setErrorMessage(null)
    },5000)
  }

  const handleBlogChange = (event) => {
    event.preventDefault()
    setNewBlog({...newBlog,[event.target.name]: event.target.value})
  }
const loginForm = () => (
  <Togglable buttonLabel='login'>
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  </Togglable>
)

  const blogForm = () => (
    <Togglable buttonLabel="new blog">
      <BlogForm
        addBlog={addBlog}
        newBlog={newBlog}
        handleBlogChange={handleBlogChange}
      />
  </Togglable>
)
  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage}/>

      {user === null ?
        loginForm() : (
        <div>
          <p>{user.name} logged in <button onClick={(e) => handleLogout(e)}>Logout</button></p>
          {blogForm()}
          <div>
              {blogs
                .sort((a, b) => b.likes - a.likes)
                .map(blog =>
              <Blog
                setBlogs={setBlogs}
                blogs={blogs}
                key={blog.id}
                blog={blog} />
            )}
            </div>
          </div>
        )
      }

    </div>
  )
}

export default App

import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'

const BlogForm = () => {
  const [newBlog, setNewBlog] = useState({
    title:'',
    author: '',
    url: '',
    likes:''
  })
  const dispatch = useDispatch()

const handleBlogChange = (event) => {
  event.preventDefault()
  setNewBlog({...newBlog,[event.target.name]: event.target.value})
}

  // ADD BLOG
const addBlog = (event) => {
  event.preventDefault()
  const blogObject = {
    title: newBlog.title,
    author: newBlog.author,
    url: newBlog.url,
    likes: newBlog.likes
  }
  dispatch(createBlog(blogObject))
}

  return (
      <div className='container'>
          <h2>Create New Blog</h2>
          <form onSubmit={addBlog}>
        <div>
          title:
          <input
            name="title"
            className="title"
            value={newBlog?.title}
            onChange={(e)=> handleBlogChange(e)}
          ></input>
        </div>
        <div>
          author:
          <input
            name="author"
            className="author"
            value={newBlog?.author}
            onChange={(e)=> handleBlogChange(e)}
          ></input>
        </div>
        <div>
          url:
          <input
            name="url"
            className="url"
            value={newBlog?.url}
            onChange={(e)=> handleBlogChange(e)}
          ></input>
        </div>
        <button type="submit" className="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default BlogForm
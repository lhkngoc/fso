import HomePage from "./components/HomePage"
import {
  Routes,
  Route
} from "react-router-dom"
import UserPage from "./components/UserPage"
import UserDetail from "./components/UserDetail"
import BlogDetail from "./components/BlogDetail"
import { initalizeBlogs} from './reducers/blogsReducer'
import { getInfo } from './reducers/infoReducer'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import { initializeUsers } from "./reducers/userReducer"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()
  const mess = useSelector(({ noti }) =>  noti )
  const info = useSelector(({info})=> info)
  useEffect(() => {
    dispatch(initalizeBlogs())
  }, [dispatch])

   useEffect(() => {
     dispatch(getInfo())
   }, [])

  useEffect(() => {
    dispatch(initializeUsers())
  },[dispatch])

  // LOGOUT
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload(false)
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Blogs</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">blogs</Nav.Link>
            <Nav.Link href="/users">users</Nav.Link>
            <p className="text-info ">{info?.name} logged in <button onClick={handleLogout}>Logout</button></p>
          </Nav>
        </Container>
      </Navbar>
      <div>
      {mess && <Notification message={mess} /> }
      </div>
    <div>
        <Routes>
          <Route path="/" element={<HomePage handleLogout={handleLogout} />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
        </Routes>
    </div>
    </div>
  )
}

export default App

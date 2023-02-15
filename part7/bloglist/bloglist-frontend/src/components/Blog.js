import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { addLike, deleteBlog } from "../reducers/blogsReducer"
const Blog = ({ blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [view, setView] = useState(false)
  const dispatch = useDispatch()

  const handleView = (e) => {
    e.preventDefault();
    setView(!view);
  }

   const handleLike = () => {
     const newBlog = {...blog, likes: blog.likes + 1 }
     dispatch(addLike(newBlog))
   }
  const handleDelete = () => {
    if (window.confirm(`Remove the blog: '${blog.title}' by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
    }
  }
  return (
    <div style={blogStyle} className="blog container"  >
      <div><Link to={`/blogs/${blog.id}`}>{blog.title}</Link> <button onClick={(e) => handleView(e)}>{ view ? "hide" : "view"}</button></div>
      {view && (
        <div>
          <div>{blog.url}</div>
          <div>
            {blog.likes === null ? 0 : blog.likes}
            <button
              style={{ marginLeft: "0.5rem" }}
              onClick={(e) => handleLike(e)}>
              like
            </button>
          </div>
          <div >{blog.author}</div>
          <button onClick={(e)=>handleDelete(e)}>remove</button>
        </div>
      )}

    </div>
  )
}

export default Blog
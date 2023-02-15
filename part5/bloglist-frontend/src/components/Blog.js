import React, { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog,blogs,setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [view, setView] = useState(false)

  const handleView = (e) => {
    e.preventDefault();
    setView(!view);
  }

  const handleLike = (e) => {
    e.preventDefault();
    const newBlog = {...blog, likes: blog.likes + 1 }
    try {
      blogService
        .addLike(newBlog)
        .then(returnedBlog =>
          setBlogs(blogs.filter(blog=>blog.id!==returnedBlog.id)))
    } catch (err) {
      console.log(err)
    }
  }
  const handleDelete = () => {
    if (window.confirm(`Remove the blog: '${blog.title}' by ${blog.author}`)) {
      try {
        blogService
          .remove(blog)
          .then(returnedBlog=> setBlogs(blogs.filter(blog=>blog.id!==returnedBlog.id)))
      }catch(err) {
        console.log(err)
      }
    }

  }
  return (
    <div style={blogStyle} className="blog"  >
      <div>{blog.title} <button onClick={(e) => handleView(e)}>{ view ? "hide" : "view"}</button></div>
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
import React from 'react'

const BlogForm = ({addBlog,newBlog,handleBlogChange}) => {


  return (
      <div>
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
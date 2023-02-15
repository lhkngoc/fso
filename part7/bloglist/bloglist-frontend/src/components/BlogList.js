import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
    const blogs = useSelector(({ blogs }) => {
        return [...blogs].sort((a, b) => b.likes - a.likes)
    })
  return (
    <div className='container'>
        {blogs.map(blog =>
            <Blog
                key={blog.id}
                blog={blog}
            />
        )}
    </div>
  )
}

export default BlogList
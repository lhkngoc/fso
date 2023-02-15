const Blog = require('../models/blogs')
const User =require('../models/users')
const initialBlogs = [
    {
      title: 'HTML is easy',
      author: "ben",
      url: "htttps/www.asd/com",
      likes:3,
    },
    {
        title: 'Java',
        author: "na",
        url: "htttps/www.ben/com",
        likes:35,
    },
]
  
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }
  
module.exports = {
    initialBlogs,blogsInDb,usersInDb
  }
const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')


blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
  })
  
blogsRouter.post('/', async(request, response,next) => {
  const body = request.body
  const token = request.token
  const user = request.user
  
  if (!(token && user)) {
    return response.status(401).json({ error: 'token missing or invalid' }) 
  }

  const blog = new Blog({
    title: body.title,
    author: body.author ,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  
  if (blog.likes===undefined) {
      blog.likes = 0;
  }
  if (blog.url === undefined && blog.title === undefined) {  
    response.status(400).send('Bad Request')
  } else {
    const savedBlog = await blog.save()
    
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } 
   
})


blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const token = request.token
  const user = request.user
  const blog = await Blog.findById(id)
  if (!(token && user)) {
    return response.status(401).json({error:"token missing or invalid"})
  }
  if (!blog) {
    return response.status(400).json({error:"couldn't find blog"})
  }
  if (blog.user.toString() === user.id.toString()) {
    await User.findByIdAndUpdate(user.id, { $pull: { blogs: id } }) //using pull method from mongoose to delete(remove) the blog which need to remved from database
    await Blog.findByIdAndDelete(id)
    
    response.status(204).json(blog).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const token = request.token
  const user = request.user
  const id = request.params.id
  if (!(token && user)) {
    return response.status(401).json({error:"token missing or invalid"})
  }
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const updatedBlog=await Blog.findByIdAndUpdate(id, blog, { new: true })
  response.json(updatedBlog.toJSON())
})
  
module.exports = blogsRouter;
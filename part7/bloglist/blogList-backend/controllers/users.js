const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')



usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  console.log('print users',users)
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
    }
  if (!(username && password)) {
    return response.status(400).json({
      error: 'missing username or password'
    })
  }
  if (username.length <= 3 || password.length <= 3) {
    return response.status(400).send(
      "Username or password must be at least 3 characters"
    );
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})


usersRouter.get('/:id', async(request, response) => {
  const id = request.params.id
  const user = await User.findById(id).populate('blogs')
    response.json(user)
})

module.exports = usersRouter
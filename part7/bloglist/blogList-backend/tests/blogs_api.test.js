const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/users')
const bcrypt = require('bcrypt')
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
      blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
  })

describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    test("the amount of blog posts", async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('the unique identifer property of the blogs', async () => {
        const response = await api.get('/api/blogs')
        const firstBlog = response.body[0]
        expect(firstBlog.id).toBeDefined()
    })
})
describe('addition of a new blog', () => {
    let token = null
  beforeAll(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('ben251', 10)
    const user = new User({ username: 'ben', passwordHash })

    await user.save()

    // Login user to get token
    await api
      .post('/api/login')
      .send({ username: 'ben', password: 'ben251' })
      .then((res) => {
        return (token = res.body.token)
      })

    return token
  })  
    test('successfully creating a new blog post', async () => {
        const newBlog = {
            title: 'Bootstrap',
            author: 'Lucy',
            url: 'www.bootstrap.com',
            likes: 5,
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const response = await helper.blogsInDb()
    
        const contents = response.map(r => r.title)
    
        expect(response).toHaveLength(helper.initialBlogs.length + 1)
        expect(contents).toContain("Bootstrap")
    })

    test("missing likes property", async() => {
        const zeroLikeBlog = {
            title: "test0",
            author: "test0",
            url: "test0",
          };
        
        await api
            .post("/api/blogs")
            .set('Authorization', `bearer ${token}`)
            .send(zeroLikeBlog)
            .expect(201);
        
          const newBlogs = await helper.blogsInDb();
          expect(newBlogs[newBlogs.length - 1].likes).toEqual(0);
    })
    
    test("missing title and url", async () => {
        const missingBLog = {
            author: "daniel",
            likes: 4
        }
        await api
            .post("/api/blogs")
            .set('Authorization', `bearer ${token}`)
            .send(missingBLog)
            .expect(400);
    })
})

describe('deletion of a blog', () => {
    let token = null
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('ben251', 10)
    const user = new User({ username: 'ben', passwordHash })

    await user.save()

    // Login user to get token
    await api
      .post('/api/login')
      .send({ username: 'ben', password: 'ben251' })
      .then((res) => {
        return (token = res.body.token)
      })

      const newBlog = {
        title: 'deno',
        author: 'ben',
        url: 'deno.com',
        likes:4
      }
  
      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      return token
  })

    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        
        expect(blogsAtEnd).toHaveLength(0)

        const contents = blogsAtEnd.map(r => r.title)
        
        expect(contents).not.toContain(blogToDelete.title)
    })
})

describe("update of a blog", () => {
    test("updating the amount of likes", async () => {
        const blogs = await helper.blogsInDb();
        const idFirstBlog = blogs[0]

        const updatedBlog = {
            title: idFirstBlog.title,
            author: idFirstBlog.author,
            url: idFirstBlog.url,
            likes: 4
        }

        await api
            .put(`/api/blogs/${idFirstBlog.id}`)
            .send(updatedBlog)
            .expect(200)
        
        const newBlogs= await helper.blogsInDb()
        expect(newBlogs[0].likes).toEqual(4)
    })
})
    
afterAll(() => {
  mongoose.connection.close()
})
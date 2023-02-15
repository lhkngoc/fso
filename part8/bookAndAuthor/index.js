const { ApolloServer,
  UserInputError,
  AuthenticationError,
  gql, } = require('apollo-server')

const jwt = require('jsonwebtoken')

const JWT_SECRET = 'ben251'

const { v1: uuid } = require('uuid')
const { books, authors } = require('./data')

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User =require('./models/user')

const MONGODB_URI =
  'mongodb+srv://namanh022:cuculala026@cluster0.pqq5jgq.mongodb.net/Part?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
})


const typeDefs = gql`
type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Query {
    authorCount: Int!
    allAuthors: [Author!]!
    bookCount: Int!
    allBooks(author: String, genres: String): [Book!]!
    me: User
  }
  type Mutation {
    addBooks(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ) : Book
    editAuthor(
      name: String!
      born: Int!
      ) : Author
    createUser(
      username:String!
      favoriteGenre: String!
    ):User
    login(
      username:String!
      password:String!
    ):Token
    }
  `
  const resolvers = {
    Query: {
      authorCount: async() => Author.collection.countDocuments(),
      bookCount: async() => Book.collection.countDocuments(),
      allBooks: async (_root, args) => {
        return await Book.find({})
      },
      allAuthors: async(_root, args) => {
        return await Author.find({})
      }
    },
    Book: {
      author: (root) => {
        const foundAuthor = authors.find(author => author.name === root.author)
        return {
          name: root.author,
          born: foundAuthor.born
        }
      }
    },
    Mutation: {
      addBooks: async(root, args,context) => {
        const currentUser = context.currentUser

        if (!currentUser) {
          throw new AuthenticationError('not authenticated')
        }

        const book = new Book({ ...args })

        try {
          await book.save()
        }catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return book
      },
      createUser: async (root, args) => {
        const user = new User({ username: args.username,favoriteGenre:args.favoriteGenre })

        return user.save().catch((error) => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })

        if (!user || args.password !== 'secret') {
          throw new UserInputError('wrong credentials')
        }

        const userForToken = {
          username: user.username,
          id: user._id,
        }

        return { value: jwt.sign(userForToken, JWT_SECRET) }
      },
      editAuthor: async (root, args,context) => {
        const currentUser = context.currentUser

        if (!currentUser) {
          throw new AuthenticationError('not authenticated')
        }

        const foundAuthor = await Author.findOne({name:args.name})
        foundAuthor.born = args.born
        try {
          await foundAuthor.save()
        }catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return foundAuthor.save()
      }
    }
  }
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    },
  })
  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })
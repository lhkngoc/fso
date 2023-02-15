const mongoose = require('mongoose');
const { authors, books } = require('../data');
const author = require('../models/author');
const Author = require('../models/author');
const Book = require('../models/book');


mongoose.connect(`mongodb+srv://namanh022:cuculala026@cluster0.pqq5jgq.mongodb.net/Part?retryWrites=true&w=majority`)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const seedDB = async () => {
    await Author.deleteMany({});
    await Book.deleteMany({});
    for (let i = 0; i < authors.length; i++){
        const author = new Author({
            name: `${authors[i].name}`,
            born: 0,
            id: `${authors[i].id}`
        })
        await author.save()
    }
    for (let i = 0; i < books.length; i++){
        const book = new Book({
            title: `${books[i].title}`,
            published: `${books[i].published}`,
            genres: `${books[i].genres}`,
            id: `${books[i].id}`

        })
        await book.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
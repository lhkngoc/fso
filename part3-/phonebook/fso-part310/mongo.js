const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const phone = process.argv[4]
const url = `mongodb+srv://namanh251:${password}@cluster0.pqq5jgq.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')
      if (phone && name) {
        const person = new Person({
            name: name,
            number: phone
        })
    
        return person.save()
    }
  })
    .then(() => {
        console.log(`addad ${name} number ${phone}`)
        Person.find({}).then(result => {
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            return mongoose.connection.close()
        })
    })
  .catch((err) => console.log(err))
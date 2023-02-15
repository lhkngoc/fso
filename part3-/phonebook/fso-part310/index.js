const { response } = require("express");
const express = require("express");
const morgan = require("morgan") 

const app = express();
let cors = require("cors");
morgan.token('body', (req, ) => JSON.stringify(req.body))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))
app.use(cors());
app.use(express.json());

let data= [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

app.get('/api/persons', (request, response) => {
    response.json(data);
})
app.get("/info", (request, response) => {
    response.send(`<div>Phonebook has info for ${data.length} people</div>
        <div>${new Date()}</div>`)
})
app.get("/api/persons/:id", (request, respone) => {
    const id = Number(request.params.id)
    const person = data.find(person => person.id === id)
    if (person) {
      respone.json(person)
    } else {
      respone.status(404).end()
  }
})

app.delete("/api/persons/:id", (request, respone) => {
  const id = Number(request.params.id)
  person  = data.filter(person => person.id !== id)

  respone.status(204).end()
})

const generateId = () => {
  const maxId = Math.floor(Math.random() * 100);
  return maxId
}
app.post("/api/persons", (request, response) => {
  const body = request.body
  const isExist = data.find(person=>person.name===body.name)
  if (!body.name && !body.number) {
    return response.status(400).json({
      error:"missing name or number"
    })
  }
  if (isExist) {
    return response.status(400).json({
      error:"name must be unique.Please change another name"
    })
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }
  data = data.concat(person)
  response.json(person)
})

const PORT =process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
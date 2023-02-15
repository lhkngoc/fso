import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './service'

const App = () => {
 
  const [persons, setPersons] = useState()
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState([]);
  const [mess, setMess] = useState("");
  const [showMess, setShowMess] = useState(false);
  const [colorNoti,setColorNoti]= useState("success")
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleInputName = (e) => {
    e.preventDefault();
    setNewName(e.target.value)
  }
  const handleInputNumber = (e) => {
    e.preventDefault();
    setNewNumber(e.target.value)
  }

  const AddPerson = (event) => {
    event.preventDefault();
    if(newName.length < 3){
      setMess(`Name is too short, please provide a name with at least 3 digits`)
      setShowMess(true)
      setColorNoti("fail")
      setTimeout(() => {
        setMess(null);
        setShowMess(false)
      }, 5000);
      return;
    } 

    if(newNumber.length < 8) {
      setMess(`number is too short, please provide a number with at least 8 digits`)
      setShowMess(true)
      setColorNoti("fail")
      setTimeout(() => {
        setMess(null);
        setShowMess(false)
      }, 5000);
      return;
    }
    const isUserExist = persons?.find((person) => person.name === newName);
    if (isUserExist) {
      const changedNumber = {...isUserExist, number:newNumber}
      if (window.confirm(`${isUserExist.name} is already added to phonebook,replace the old number with the new one?`)) {
        personService
          .update(isUserExist.id, changedNumber)
          .then(returnedUser => {
            setPersons(persons.map(person => person.id !== isUserExist ? person : returnedUser))
            setShowMess(true);
            setMess(`${isUserExist.name}'s number was updated`)
            setNewName("");
            setNewNumber("");
            setColorNoti("success")
          })
          .catch((error) => {
            setMess(error.response.data.error)
            setShowMess(true);
          })
      }
      setTimeout(() => {
        window.location.reload(false);
        setShowMess(false);
      }, 3000)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      personService
        .create(personObject)
        .then(returnPerson => {
          setPersons(persons.concat(returnPerson))
          setNewName("");
          setNewNumber("");
          setMess(`Added ${newName}`);
          setShowMess(true);
          setColorNoti("success")
        })
        .catch((error) => {
          setMess(error.response.data.error)
          setColorNoti("fail")
          setShowMess(true);
        })
      setTimeout(() => {
        setColorNoti("success   ")
        setShowMess(false)
      },3000)
    }
  }

  const handleFilter = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      personService
        .deletePerson(id)
        .then(returnPerson => {
          setPersons(persons.filter(person=> person.id !==id));
          setMess(`${name} is deleted`)
          setShowMess(true);
        })
        .catch((err) => {
          setMess(`the person name : "${name}" was already deleted from server`)
          setShowMess(true);
          setPersons(persons.filter(person => person.id !== id))
          setColorNoti("fail")
        })
    }
    setTimeout(() => { 
      setShowMess(false)
      setColorNoti("success")
    },3000)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      {showMess && <Notification mess={mess} color={colorNoti} />}
      <Filter handleFilter={handleFilter} search={search} />
      
      <h3>Add a new</h3>

      <PersonForm
        AddPerson={AddPerson}
        newName={newName}
        newNumber={newNumber}
        handleInputName={handleInputName}
        handleInputNumber={handleInputNumber}
      />

      <h3>Numbers</h3>

      {
        persons?.map((person) =>
        person?.name?.toLowerCase().includes(search.toString().toLowerCase()) ?
        (
              <Persons
                name={person.name}
                handleDelete={handleDelete}
                number={person.number}
                id={person.id}
                key={person.id}
              />
        ) : ("")
        )
      }  
    </div>
  )
}

export default App
import React from 'react'

const Persons = ({ name, number, id,handleDelete }) => {
  
  return (
    <div>
      <p>{name} - {number}</p>
      <button onClick={(e)=>handleDelete(id,name,e)}>Delete</button>
    </div>
  )
}

export default Persons
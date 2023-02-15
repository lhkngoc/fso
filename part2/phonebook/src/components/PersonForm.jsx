import React from 'react'

const PersonForm = ({AddPerson,newName,newNumber,handleInputName,handleInputNumber}) => {
  return (
    <div>
       <form onSubmit={AddPerson}>
        <div>
          name: <input value={newName} onChange={(e) => handleInputName(e)} focus="true" />
        </div>
        <div>
          number: <input value={newNumber} onChange={(e) => handleInputNumber(e)} focus="true" />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>   
    </div>
  )
}

export default PersonForm
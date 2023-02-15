import React from 'react'

const Filter = ({handleFilter,search}) => {
  return (
    <div>
      <p>filter show with <input onChange={(e) => handleFilter(e)} value={search} /></p>    
    </div>
  )
}

export default Filter
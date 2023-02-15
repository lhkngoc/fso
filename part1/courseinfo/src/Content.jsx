import React from 'react'
import Part from './Part'
const Content = ({parts}) => {
  return (
    <div>
      <Part name={parts[0].name} ex={parts[0].exercises }/>
      <Part name={parts[1].name} ex={parts[1].exercises }/>
      <Part name={parts[2].name} ex={parts[2].exercises }/>
    </div>
  )
}

export default Content
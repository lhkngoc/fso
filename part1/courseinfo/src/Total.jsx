import React from 'react'

const Total = ({content}) => {
  return (
    <div>Total : {content[0].exercises +content[1].exercises + content[2].exercises }</div>
  )
}

export default Total
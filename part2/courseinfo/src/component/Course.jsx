import React from 'react'

const Header = ({ name }) => {
    return <h1><b>{name}</b></h1>
}
const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(part => 
                <Part key={part.id} part={part} />)}
        </div>
    )
}
const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p> 
    )
}

const Sum = ({ course }) => {
    const total = course.parts.reduce((prev,current)=> prev+current.exercises,0)
    return (
        <div><b>Total of exercise: {total}</b></div>
    )
}

const Course = ({course}) => {
  return (
      <div>
          <Header name={course.name} />
          <Content course={course}/>
          <Sum course={course}/>
    </div>
  )
}

export default Course
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = ({anecdotes,setAnecdotes,setNotification}) => {
    const content = useField("text")
    const author = useField("text")
    const info = useField('text')


    const navigate= useNavigate()

    const handleSubmit = (e) => {
      e.preventDefault()
        const newAnecdote = {
            content:content.value,
            author:author.value,
            info:info.value,
            votes: 0,
            id:Math.round(Math.random() * 10000)
        }
        setAnecdotes(anecdotes.concat(newAnecdote))
        setNotification(`a new anecdote '${newAnecdote.content}' created!`)
        navigate('/')
    }
    const handleReset = (event) => {
        event.preventDefault()
        content.reset()
        author.reset()
        info.reset()
    }
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input
                value={content.value}
                type={content.type}
                onChange={content.onChange}
            />
          </div>
          <div>
    author
            <input
                value={author.value}
                type={author.type}
                onChange={author.onChange}
            />
          </div>
          <div>
            url for more info
            <input
                value={info.value}
                type={info.type}
                onChange={info.onChange}
            />
          </div>
            <button>create</button>
         </form>
         <button onClick={handleReset}>reset</button>
      </div>
    )

  }

export default CreateNew
import React from 'react'
import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
    const {id} = useParams();
    const anecdote= anecdotes.find((ane) => ane.id === Number(id))
  return (
    <div>
          <h2><b>{anecdote.content}</b></h2>
          <p>has {anecdote.votes} votes</p>
          <p>for more info see {anecdote.info}</p>
    </div>
  )
}

export default Anecdote
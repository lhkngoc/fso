import React from 'react'
import { connect } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotifications } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAD =async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotifications(`new anecdote was created '${content}'`,5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAD}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  setNotifications
}

export default connect(null,mapDispatchToProps)(AnecdoteForm)
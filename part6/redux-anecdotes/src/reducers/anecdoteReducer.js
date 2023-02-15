import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotesService'

// const anecdoteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'VOTING':
//       const votingState = state.find(n => n.id === action.data.id)
//       const changedVotingState = { ...votingState, votes: votingState.votes + 1 }
//       const newState = state.map(anecdote => anecdote.id !== action.data.id ? anecdote : changedVotingState)
//       const sortNewState = newState.sort((a, b) => b.votes - a.votes)
//       return sortNewState
//     case 'NEW_AD':
//       const data = action.data.data
//       const newAD = asObject(data)
//       return [...state,newAD]
//     default : return state
//   }

// }

// export const addVote = (id) => {
//   return {
//     type: 'VOTING',
//     data: {id}
//   }
// }
// export const newAD = (data) => {
//   return {
//     type: 'NEW_AD',
//     data : {data}
//   }
// }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState:[],
  reducers: {
    // newAD(state, action) {
    //   return [...state, action.payload]
    // },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    addVote(state, action) {
      // const votingState = state.find(n => n.id === action.payload)
      return state.map(anecdote => anecdote.id !== action.payload.id ? anecdote : action.payload)
      // console.log('votingState',votingState)
      // const changedVotingState = { ...votingState, votes: votingState.votes + 1 }
      // const newState = state.map(anecdote => anecdote.id !== action.payload ? anecdote : changedVotingState)
      // const sortNewState = newState.sort((a, b) => b.votes - a.votes)
      // return sortNewState
    },
   }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const votingAnecdote = (id) => {
  return async dispatch => {
    const votedAnecdote = await anecdotesService.voting(id)
    dispatch(addVote(votedAnecdote))
  }
}

export const {addVote,appendAnecdote,setAnecdotes}= anecdoteSlice.actions
export default anecdoteSlice.reducer
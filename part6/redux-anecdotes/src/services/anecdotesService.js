import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = {
    content,
    id: Number((Math.random() * 1000000).toFixed(0)),
    voted: 0
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voting = async (id) => {
  const votingAnecdote = await axios.get(`${baseUrl}/${id}`)
  const newVotingAnecdote = {...votingAnecdote.data, votes: votingAnecdote.data.votes + 1 }
  const response = await axios.put(`${baseUrl}/${id}`, newVotingAnecdote)
  return response.data
}

// const upvote = async (id) => {
//   const anecToUpvote = await axios.get(`${baseUrl}/${id}`)
//   const upvotedAnec = {...anecToUpvote.data, votes: anecToUpvote.data.votes + 1}
//   const response = await axios.put(`${baseUrl}/${upvotedAnec.id}`, upvotedAnec)
//   return response.data
// }

export default { getAll,createNew,voting }
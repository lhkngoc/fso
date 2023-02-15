import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  const [selected, setSelected] = useState(0);
  const [array, setArray] = useState(new Array(anecdotes.length).fill(0));
  const [max, setMax] = useState(0);
  const handleClick=(e) => {
    e.preventDefault();
    setSelected(() => {
      return Math.floor(Math.random() * anecdotes.length);
    })
  }
  const handleVote = async(e) => {
    e.preventDefault();
    const copy = [...array]
    copy[selected]++
    setArray(copy)
    setMax(copy.indexOf(Math.max(...copy)))
  };
  
  return (
    <div>
      <h1>Abecdite of the day</h1>
      <p>{anecdotes[selected]}</p>
      <h3>Vote: {array[selected]}</h3>
      <button onClick={(e)=>handleVote(e)}>Vote</button>
      <button onClick={(e) => handleClick(e)}>next anecdote</button>
      <hr></hr>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[max]}</p>
    </div>
  )
}

export default App
import { useState,useEffect } from 'react'

const Statistics = ({ good, neutral, bad, average, positive,feedBack }) => {
  return (
    <table>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="feedBack" value={feedBack}/>
      <StatisticLine text="average" value={average}/>
      <StatisticLine text="positive" value={positive}/>
    </table >
  )
}

const StatisticLine = (props) => {
  return(
    <div>
      {props.text}  {props.value}{props.text==="positive" && "%"}
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [feedBack,setFeedBack]= useState(0)
  const [average, setAvarage] = useState(0);
  const [positive, setPositive] = useState(0);
  const [input,setInput]=useState('')

  useEffect(() => (
    setAvarage(() => {
      return (good-bad)/feedBack
    })
  ),[feedBack])
  
  useEffect(() => (
    setPositive(() => {
      return (good*100)/feedBack
    })
  ),[feedBack])

  const handleClickGood = (e) => {
    e.preventDefault();
    setGood(prev => prev + 1);
    setFeedBack(prev => prev + 1)
    
  }
  const handleClickNeutral = (e) => {
    e.preventDefault();
    setNeutral(prev => prev + 1);
    setFeedBack(prev => prev + 1)
  }
  const handleClickBad= (e) => {
    e.preventDefault();
    setBad(prev => prev + 1);
    setFeedBack(prev => prev + 1)
  }

  

  return (
    <div>
      <h1>FeedBack</h1>
      <div>
      <button onClick={(e)=>handleClickGood(e)}>Good</button>
      <button onClick={(e)=>handleClickNeutral(e)}>neutral</button>
        <button onClick={(e) => handleClickBad(e)}>bad</button>
      </div>
      <h1>Statistics</h1>
      {feedBack === 0 ? 'No feedback' :
        <Statistics good={good} bad={bad} feedBack={feedBack} average={average} positive={positive} neutral={neutral} />
      }
  </div>
    

  )



}

export default App
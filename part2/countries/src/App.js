import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Country from './component/Country';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false)
  const [choose,setChoose]=useState(0)
  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(respone=> {setCountries(respone.data)})
  },[])
  
  useEffect(() => {
    setCountries(filter)
  },[input])

  const handleInput = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  }
  const filter = countries.filter((country) => country.name.common.toLowerCase().includes(input.toLowerCase()))

  const handleClick = (country)=> {
    setShow(!show);
    setChoose(country);
  }
  return (
    <div>
      {choose !== 0 ? <Country country={choose} /> : (
        <div>
      <p>find countries <input value={input} onChange={(e) => handleInput(e)} /></p>
      {
        (countries?.length > 10) ? (
          <p>Too many matches,specify another filter</p>
        ) : countries?.length === 1 ? (
            <Country country={countries[0] } />
          ) : (
              countries?.map((country,i) => (
                <div>
                  {country?.name.common}
                  <button onClick={() => handleClick(country)}>Show</button>
                </div>
              ))
            )
      }
     </div> )}
    </div>
  )
}

export default App
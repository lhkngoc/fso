import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Country = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [languages, setLanguages] = useState([])
  const [weather, setWeather] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.name.common}&units=metric&APPID=${api_key}`)
      .then(respone => { setWeather(respone.data) });
      setLoading(false);
  }, [])
  console.log("weathe", weather);
  
  useEffect(() => {
    let valuesArray = Object.values(country.languages);
    for (let value of valuesArray) {
      setLanguages(prev=> prev +" "+value);
    }
   
  }, [])
  
  return (
    <div>
          <h1>{country.name.common}</h1>
          <p>capital {country.capital}</p>
          <p>area {country.area}</p>
          <h2><b>languages</b></h2>
          <p>{languages}</p>
      <img src={country.flags.png} />
      {loading ? (
        "Loading"
      ) : (
        <div>
          <h2><b>Weather in {country.capital[0]}</b></h2>
          <p>temperature {weather?.main?.feels_like} Celcius</p>
            {weather.length !== 0 && <img src={`http://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`} />}
            <p>wind {weather?.wind?.speed } m/s</p>
        </div>
      )}
    </div>
  )
}

export default Country
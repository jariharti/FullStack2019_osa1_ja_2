/* Jari Hartikainen, 19.5.2019 */
/* Aalto University, Course: Full Stack Web Development, Part 2: Maiden tiedot step1...step3*/

import './index.css';
import React, { useState, useEffect } from 'react' 
import axios from 'axios'
import './App.css'


const App = () => {

    console.log("applikaatio käynnistyy")
    const [countries, getCountries] = useState([])
    const [filtered_countries, filterCountries] = useState([])
    const [limitVisibility, setNewVisibility ] = useState("")
    const [wheather, getWeather] = useState([])
    const [count,setCount] = useState(0)
    const [capital,setCapital] = useState ("Helsinki")


    // User sets filter criteria, what countries want to see
    const handVisibilityChange = (event) => {
        console.log("handlevisibilityChange")
        setNewVisibility(event.target.value)
        filterCountries(countries.filter(filter_rule => filter_rule.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1))
        var new_capital = ((countries.filter(filter_rule => filter_rule.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)).map(maat => maat.capital)[0])
        setCapital(new_capital)
        if (typeof new_capital === `string`) setCount(count+1)
    }
  
    // Get country data from https://restcountries.eu/rest/v2/all, but only once during the session
    useEffect(() => {
        console.log("get country data from https://restcountries.eu/rest/v2/all")
        axios.get(`https://restcountries.eu/rest/v2/all`).then(response1 => {
            getCountries(response1.data)
            filterCountries(response1.data.filter(filter_rule => filter_rule.name.toLowerCase().indexOf(limitVisibility.toLowerCase()) !== -1))
            setCapital(((response1.data.filter(filter_rule => filter_rule.name.toLowerCase().indexOf(limitVisibility.toLowerCase()) !== -1).map(maat => maat.capital)[0])))
        })
      }, []
      )

    // Get wheather data from https://api.apixu.com/v1 for chosen capital. Do the get everytime, user change the filter criteria
    useEffect(() => {
          console.log("get capital wheater data from https://api.apixu.com/v1 ")
          console.log("useEffect: count",count,"from capital",capital)
          axios.get(`https://api.apixu.com/v1/forecast.json?key=2bb8979384774f8ab9e100902191705&q=${capital}&days=5`).then(response2 => {
            getWeather(response2.data)
          })
          }, [count]
          )

     // Count how many countries in the scope of filtered criteria
     var nbr_countries = Object.keys(filtered_countries).length

     // Show results....
    return (
          <div>
            <p>&nbsp;find countries  <input type="text" name="rajaa näytettäviä" value={limitVisibility}  onChange={handVisibilityChange}/></p>
            <ShowCountries nbr_countries = {nbr_countries} filtered_countries = {filtered_countries} wheather={wheather}/>
        </div>
    )
}
    
// Show results in different scenarios
const ShowCountries = (props) => {
// Based on your country filter, number of countries >0 ja <10
if (props.nbr_countries > 1 && props.nbr_countries <10) {
    console.log ("Based on your country filter, number of countries >0 ja <10")

    const ShowCountryDetails = (event) => {
        window.location.replace(event.target.name)
    }

    return (
        <div>
        {props.filtered_countries.map(item => {
        return (<ul key={item.name}>
            <strong>{item.name}</strong> <input type="button" value="show" name={`https://restcountries.eu/rest/v2/name/${item.name}`}  onClick={ShowCountryDetails}/> <br></br>
        </ul>);
        })}
        </div>
    )
}
// "Based on your country filter, number of countries ===1"
else if (props.nbr_countries === 1) {
    console.log ("Based on your country filter, number of countries ===1")
    console.log("saatila",props.wheather)
    console.log("filtered countries ....",props.filtered_countries[0])

    return (
        <div>
            <h2>&nbsp;{props.filtered_countries[0].name}</h2> <p>&nbsp;capital&nbsp;{props.filtered_countries[0].capital} </p><p>&nbsp;population&nbsp;{props.filtered_countries[0].population}</p>
            <h3>&nbsp;languages</h3>
            {props.filtered_countries[0].languages.map(c2 => <ul key={c2.name.toString()}><li>{c2.name}</li></ul>)}
            <br></br>&nbsp;<img src={props.filtered_countries[0].flag} alt={`Flag of ${props.filtered_countries[0].name}`} height="80" width="120"></img>
            <h3>&nbsp;{`Weather in ${props.filtered_countries[0].capital}`}</h3>
            <p><b>&nbsp;temperature:&nbsp;</b>{props.wheather.current.temp_c}&nbsp;Celsius</p>
            <p><img src={props.wheather.current.condition.icon} alt={`Wheater of ${props.wheather.location.name}`} height="100" width="100"></img></p>
            <p><b>&nbsp;wind:&nbsp;</b>{props.wheather.current.wind_kph}&nbsp;kph direction&nbsp;{props.wheather.current.wind_dir}</p>
        </div>
    )


}
// "Based on your country filter,number of countries >1"
else if (props.nbr_countries > 10) {
    console.log ("Based on your country filter,number of countries >10")
    return (
        <div>
        <p>&nbsp;Too many matches, specify another filter</p>
        </div>
    )
}
// "Based on your country filter, number of countries == 0"
else {
    console.log ("Based on your country filter, number of countries == 0")
    return (
    <div>
        <p>&nbsp;0 matches, specify another filter</p>
    </div>
    )
    }
}

export default App
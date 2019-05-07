/* Jari Hartikainen, 5.5.2019 */
/* Aalto University, Course: Full Stack Web Development, Part 1: Unicafe step1...step6 */

import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const setToValue1 = (value) => setGood(value)
    const [neutral, setNeutral] = useState(0)
    const setToValue2 = (value) => setNeutral(value)
    const [bad, setBad] = useState(0)
    const setToValue3 = (value) => setBad(value)
    
    return (
      <div>
         <h1>anna palautetta</h1>
         <Button
         handleClick={() => setToValue1(good + 1)}
         text='hyvä'
        />
        <Button
          handleClick={() => setToValue2(neutral + 1)}
          text='neutraali'
        />
        <Button
          handleClick={() => setToValue3(bad +1)}
          text='huono'
       />
         <Statistics good = {good} neutral={neutral} bad={bad}/>
      </div>
    )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({good, neutral, bad}) => {
  let total = 0
  let average = 0
  let positive = 0
  total = good + neutral + bad
  average = (good*1 + neutral*0 + bad*-1)/(total)
  positive = 100*(good / total)
  if (total > 0) {
    return (
      <div>
        <h1>statistiikka</h1>
        <Statistic text="hyvä" value ={good} />
        <Statistic text="neutraali" value ={neutral} />
        <Statistic text="huono" value ={bad} />
        <Statistic text="yhteensä" value ={total} />
        <Statistic text="keskiarvo" value ={average} />
        <Statistic text="positiivisia" value ={positive.toFixed() +" %"} />
      </div>
      )
  } else {
  return (
    <div>
      <h1>statistiikka</h1>
      <p>Ei yhtään palautetta annettu</p>
      </div>
  )
  }
}

const Statistic = ({text, value}) => {
  return (
    <div>
      <table>
          <tbody>
              <tr>
                  <td>{text}</td>
                  <td>{value}</td>
              </tr>
          </tbody>
      </table>
    </div>
  )
}
  
ReactDOM.render(<App />, 
    document.getElementById('root')
)
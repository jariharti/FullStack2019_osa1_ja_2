/* Jari Hartikainen, 7.5.2019 */
/* Aalto University, Course: Full Stack Web Development, Part 1: Anecdotes Step1...Step3 */

import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, updateVote] = useState([0,0,0,0,0,0])
  
  const newVote = (index) => {
    const copy = { ...votes}
    copy[index] += 1
    updateVote(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={() => newVote(selected)} > vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * 6))} > next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <IndexOfMax votes={votes} anecdotes={props.anecdotes}/>
    </div>
  )
}

const IndexOfMax = (props) =>  {
  const result = Object.values(props.votes)
  if (result.length === 0) {
      return -1;
  }
  var max = result[0];
  var maxIndex = 0;

  for (var i = 1; i < result.length; i++) {
      if (result[i] > max) {
          maxIndex = i;
          max = result[i];
      }
  }
  return (
    <div>
      <p>{props.anecdotes[maxIndex]}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
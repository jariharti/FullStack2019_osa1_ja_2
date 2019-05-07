/* Jari Hartikainen, 5.5.2019 */
/* Aalto University, Course: Full Stack Web Development, Part 1: Kurssitiedot Step1...Step2 */

import React from 'react'
import ReactDOM from 'react-dom'


const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
          {
            name: 'Reactin perusteet',
            exercises: 10
          },
          {
            name: 'Tiedonvälitys propseilla',
            exercises: 7
          },
          {
            name: 'Komponenttien tila',
            exercises: 14
          }
        ]
      }
  
    return (
      <div>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
      </div>
    )
}



const Header = (props) => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    )
  }

const Content = (props) => {
    return (
      <div>
        <Part part={props.parts[0].name} exercises={props.parts[0].exercises}/> 
        <Part part={props.parts[1].name} exercises={props.parts[1].exercises}/> 
        <Part part={props.parts[2].name} exercises={props.parts[2].exercises}/> 
      </div>
    )
  }

  const Total = (props) => {
    return (
      <div>
        <p>yhteensä {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} tehtävää</p>
      </div>
    )
  }

  const Part = (props) => {
    return (
      <div>
        <p>
        {props.part} {props.exercises}
      </p>
      </div>
    )
  }


ReactDOM.render(<App />, document.getElementById('root'))
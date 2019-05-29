import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {

    const course = {
      name: 'Half Stack -sovelluskehitys',
      parts: [
        {
          name: 'Reactin perusteet',
          exercises: 10,
          id: 1
        },
        {
          name: 'Tiedonvälitys propseilla',
          exercises: 7,
          id: 2
        },
        {
          name: 'Komponenttien tila',
          exercises: 14,
          id: 3
        }
      ]
    }

    
    return (
      <div>
        <Course course={course}/>
      </div>
    )
}



const Course=(props) => {

  const exercise_array = props.course.parts.map(note1 => note1.exercises)
  console.log(exercise_array)

  const total_exercise = exercise_array.reduce((sum,number) => sum + number,0)
  console.log(total_exercise)


  const new_course = () => 
        props.course.parts.map(details_course => 
          <p key={details_course.id}>{details_course.name} {details_course.exercises}</p>
        )

  return (
        <div>
            <h1> {props.course.name} </h1>
            <p> {props.exercises}</p>
            {new_course()}
            <p>yhteensä {total_exercise} tehtävää</p>

        </div>
        )

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
/* Jari Hartikainen, 9.5.2019 */
/* Aalto University, Course: Full Stack Web Development, Part 2: Kurssitiedot step6...step9 + 2.5*/

import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course'

const App = () => {

  const courses = [
    {
      name: 'Half Stack -sovelluskehitys',
      id: 1,
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewaret',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

    
  return (
     < Course kurssit={courses}/>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
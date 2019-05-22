/* Jari Hartikainen, 10.5.2019 */
/* Aalto University, Course: Full Stack Web Development, Part 2: Kurssitiedot step6...step9 + 2.5 */

import React from 'react'

const Course=(props) => {
  return (
    <div> 
    {
      props.kurssit.map(item => (<div key={item.name.toString()}><h1>{item.name}</h1>
        {item.parts.map(note => <p key={note.name.toString()}>{note.name} {note.exercises}</p>)}
        Yhteensä {(item.parts.map(note1 => note1.exercises).reduce((sum, number) => sum + number, 0))} tehtävää
      </div>))
    }
    </div>
    )

  
  }

  export default Course
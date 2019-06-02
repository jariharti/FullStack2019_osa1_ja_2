/* Jari Hartikainen, 29.5.2019 */
/* Aalto University, Course: Full Stack Web Development, Part 3: Puhelinluettelo step9...step11*/

import React, { useState, useEffect } from 'react'
import commsService from './services/comms'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ new_name, setNewName ] = useState('')
  const [ new_number, setNewNumber ] = useState('')
  const [ limitVisibility, setNewVisibility ] = useState('')
  const [notificationMessage, setNotificationMessage] = useState()
  const [notificationMessageType, setNotificationMessageType] = useState()


  // get persons information during initializing
  useEffect(() => {
    console.log("getAll")
    commsService
    .getAll().then(response => {
      console.log("getall operation succeeded",response)
      setPersons(response.data)
      setNotificationMessage(
        `Phonebook information received successfully`
      )
      setNotificationMessageType("success")
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    })
    .catch(error => {
      setNotificationMessage(
        `Oops.. Something went wrong when application tried to read phonebook data from the server`
      )
      setNotificationMessageType("error")
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationMessageType("error")
      }, 5000)
    })
  }, [])

  // add new name to phonebook
  const addName = (event) => {
    console.log("addName")
    event.preventDefault()

    // Test if name already in the phonebook
    if ((persons.map(person2 => person2.name)).includes(new_name)) {
      console.log("Nimi jo puhelinluettelossa, testaa seuraavaksi onko puhelinumero eri")
      // Test if phone number is new for the person, that already in the phonebook
      if ((persons.filter(person3 => person3.name === new_name)[0].number) === new_number){
        console.log("Nimi jo puhelinluettelossa, samoin puhelinnumero")
        // Both name and phone number already in the phonebook
        alert(`${new_name} on jo luettelossa`);
      }
      else {
          console.log("Haluat korvata vanhan numeron uudella")
          // ask if user wants to change phoine number for existing name
          if (window.confirm(`${new_name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
            console.log("vastasit OK")


            // define new person array based on giving information
            var updated_name = {
              name: (persons.filter(updates => updates.name === new_name))[0].name,
              number: new_number,
              id: (persons.filter(updates => updates.name === new_name))[0].id
            }

            console.log("updated_name",updated_name)


            commsService
            .update(updated_name).then(response => {
              console.log("update operation succeeded",response)
              console.log("persons",persons)
              // remove person's old information from phonebook, add a new one
              setPersons((persons.filter(all => all.id !== updated_name.id)).concat(updated_name))
              setNotificationMessage(
                `${new_name}'s phone number changed succesfully to ${new_number}`
              )
              setNotificationMessageType("success")
              setTimeout(() => {
                setNotificationMessage(null)
                setNotificationMessageType("success")
              }, 5000)
            })
            .catch(error => {
              console.log("error situation")
              setNotificationMessage(
                `Unfourtunately ${new_name} data already removed from server`
              )
              setNotificationMessageType("error")
              setPersons((persons.filter(n=>n.id !==updated_name.id)))
              setTimeout(() => {
                setNotificationMessage(null)
                setNotificationMessageType("error")
              }, 5000)
            })
          }
      }
    }
    else {
      // Add new person tho phonebook
      var nameObject = {
        name: new_name,
        number: new_number
      }
      console.log("nameObject",nameObject)
      commsService
        .create(nameObject).then(response => {
          console.log("received response from create operation",response)
          setPersons(persons.concat(response.data))
          setNotificationMessage(
          `${response.data.name}'s data added succesfully to phonebook`
          )
          setNotificationMessageType("success")
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationMessageType("success")
          }, 5000)
        })
        .catch(error => {
          console.log(".catch/error from .create operation",error)
          setNotificationMessage(
            JSON.stringify(error.response.data)
          )
          setNotificationMessageType("error")
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationMessageType("error")
          }, 5000)
        })
      setNewName('')
      setNewNumber('')
    }
}

  // user wants to delete name from phonebook
  const deleteName = (event) => {
    console.log("delete name")
    if (window.confirm(`Poistetaanko ${event.target.name}`))
    {
      var persons_left = persons.filter(henkilot => henkilot.name !== event.target.name)
      var delete_person = (persons.filter(henkilot => henkilot.name === event.target.name))[0]
      var delete_person_by_name = event.target.name

      console.log("event.target.name",event.target.name)
      commsService
        .remove(delete_person).then(response => {
          console.log("delete operation ...",response)
          if (response.status === 204) {
            console.log("delete operation succeeded",response)
            console.log ("response ==== 204 => persons left...", persons_left)
            setPersons(persons_left)
            setNotificationMessage(
              `${delete_person_by_name}'s data removed succesfully from phonebook`
           )
           setNotificationMessageType("success")
           setTimeout(() => {
             setNotificationMessage(null)
             setNotificationMessageType("success")
           }, 5000)
          }
        })
        .catch(error => {
          console.log("error 2 situation", error.response.data)
          setNotificationMessage(
            JSON.stringify(error.response.data)
          )
          setNotificationMessageType("error")
          setPersons((persons_left.filter(n=>n.id !==delete_person.id)))
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationMessageType("error")
          }, 5000)
        })
    }
  }

  // "Lisää uusi" -> user edits new name string
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  // "Lisää uusi" -> user edist new phone number string
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  // "Lisää uusi" -> user pushed "lisää" button
  const handVisibilityChange = (event) => {
    setNewVisibility(event.target.value)
  }


  return (
    <div>
      <h1>&nbsp;Puhelinluettelo</h1>
      <Notification message={notificationMessage} notificationMessageType={notificationMessageType} />
      <Filter limitVisibility={limitVisibility} handVisibilityChange={handVisibilityChange} />
      <h2>&nbsp;Lisää uusi</h2>
      <PersonForm addName={addName} new_name={new_name} handleNameChange={handleNameChange} new_number={new_number} handleNumberChange={handleNumberChange}/>
      <h2>&nbsp;Numerot</h2>
      <Persons persons={persons} limitVisibility={limitVisibility} deleteName = {deleteName}/>
    </div>
  )

}

const Persons = (props) => {
  
  return (props.persons.filter(filter_rule => filter_rule.name.toLowerCase().indexOf(props.limitVisibility.toLowerCase()) === 0)).map(filtered => <p key={filtered.name}>&nbsp;{filtered.name} {filtered.number}
  <input type="button" name={filtered.name} value="poista" onClick={props.deleteName}/>
  </p>)

}


const Filter=(props) => {
  return (
    <div>
    &nbsp;rajaa näytettäviä <input type="text" name="rajaa näytettäviä" value={props.limitVisibility}  onChange={props.handVisibilityChange}/>
    </div>
  )
}

const PersonForm=(props) => {
  return (
      <form onSubmit={props.addName}>
        <div>
        &nbsp;nimi: <input value={props.new_name} onChange={props.handleNameChange}/><br></br>
        &nbsp;numero: <input value={props.new_number} onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
  )

}

const Notification = (props) => {
  if (props.message === null) {
    return null
  }

  return (
    <div className = {props.notificationMessageType} >
      {props.message}
    </div>
  )
}

export default App
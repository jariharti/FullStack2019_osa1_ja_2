import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response)
}


const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response)
}

const remove = (deletedObject) => {
  const request = axios.delete(`${baseUrl}/${deletedObject.id}`)
  return request.then(response => response)
}

const update = (updatedObject) => {
  const request = axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject)
  return request.then(response => {
  return response.status;
  })
}

export default { getAll, create, remove, update }
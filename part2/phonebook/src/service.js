import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = async () => {
    try {
        const request = axios.get(baseUrl)
        return request.then(response => response.data)
    } catch (err) {
        console.log(err);
    }
}

const create = async(newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = async(id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}
  
const deletePerson = async(id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response=> response.data)
}
export default { getAll, create,deletePerson,update }
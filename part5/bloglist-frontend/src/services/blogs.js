import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
  const request =axios.get(baseUrl)
  const response = await request
  return response.data
}

const addLike = async(newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const newBaseUrl = `${baseUrl}/${newObject.id}`
  
  const response = await axios.put(newBaseUrl,newObject,config)
    return response.data
}

const remove = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const newBaseUrl = `${baseUrl}/${newObject.id}`

  const response = await axios.delete(newBaseUrl, config)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { getAll,setToken,create,addLike,remove }
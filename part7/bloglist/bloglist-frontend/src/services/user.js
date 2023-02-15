import axios from 'axios'
const baseUrl = '/api/users'


const getAllUsers = async () => {
    const request =axios.get(baseUrl)
    const response = await request
    return response.data
}

const getUser = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}
export default {getAllUsers,getUser}
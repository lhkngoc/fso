import { createSlice } from "@reduxjs/toolkit";
import userService from '../services/user'
const userReducer = createSlice({
    name: 'user',
    initialState: [],
    reducers: {
        setUsers(state, action){
            return action.payload
        },

    }
})

export const initializeUsers = () => {
    return async dispatch =>{
        const users = await userService.getAllUsers()
        dispatch(setUsers(users))
    }
}


export const {setUsers} = userReducer.actions
export default userReducer.reducer
import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'


const infoReducer = createSlice({
    name: 'info',
    initialState: null ,
    reducers: {
        getUserInfo(state, action) {
            return action.payload
        },
        setUserInfo(state, action) {
            return action.payload
        },
    }
})

export const getInfo=()=>{
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(getUserInfo(user))
      blogService.setToken(user.token)
    }
    }
}

export const setInfo = (user) => {
    return async dispatch => {
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        blogService
            .setToken(user.token)

        dispatch(setUserInfo(user))
    }
}

export const { getUserInfo,setUserInfo} = infoReducer.actions
export default infoReducer.reducer
import { createSlice } from "@reduxjs/toolkit"

const notificationReducer = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification: (state, action) => {
            return action.payload
        },
        clearNotification: (state, action) => {
            return ''
        }
    }
})

let timeoutID

export const setNotifications = (content, time) => {
    return async dispatch => {
    clearTimeout(timeoutID)
    dispatch(setNotification(content))
    timeoutID=setTimeout(() => {
    dispatch(clearNotification(timeoutID))
     }, time*1000)
    }
}

export const {setNotification,clearNotification} = notificationReducer.actions

export default notificationReducer.reducer
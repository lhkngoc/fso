import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
    name: 'noti',
    initialState: "",
    reducers: {
        setMessage(state, action) {
            return action.payload
        },
        clearMess() {
            return ""
        }
    }
})

export const setNoti = (mess) => {
    return async dispatch => {
        dispatch(setMessage(mess))
        setTimeout(() => {
            dispatch(clearMess())
        },5000)
    }
}

export const {setMessage,clearMess} = notificationReducer.actions
export default notificationReducer.reducer
import { createSlice } from "@reduxjs/toolkit";
import userService from '../services/user'
import blogService from '../services/blogs'

const userDetailReducer = createSlice({
    name: 'detail',
    initialState: null,
    reducers: {
        getDetail(state, action) {
            return action.payload
        }
    }
})

export const getUserDetail = (id) => {
    return async dispatch => {
        const userDetail = await userService.getUser(id)
        dispatch(getDetail(userDetail))
    }
}

export const getBlogDetail = (id) => {
    return async dispatch => {
        const blogDetail = await blogService.getBlogDetail(id)
        dispatch(getDetail(blogDetail))
    }
}

export const { getDetail } = userDetailReducer.actions
export default userDetailReducer.reducer
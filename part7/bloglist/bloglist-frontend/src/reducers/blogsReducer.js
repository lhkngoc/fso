import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'
import { setNoti } from './notificationReducer'

const blogsReducer = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
        likeBlog(state, action) {
            return state.map(blog=> blog.id !== action.payload.id ? blog : action.payload)
        },
        removeBlog(state, action) {
            return state.filter(blog => blog.id !== action.payload.id)
        },
        addComment(state, action) {
            const blog = state.filter((blog) => blog.id === action.payload.id)
            const blogWithComments = { ...blog, comments: action.payload.comments }
            return state.filter((blog)=> blog.id !== action.payload.id ? blog : blogWithComments)
        }
    }
})

export const initalizeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }

}
export const createBlog = (blog) => {
    return async dispatch => {
        blogService
        .create(blog)
        .catch(error =>
        { dispatch(setNoti(error.response.data.error)) })
        dispatch(appendBlog(blog))
    }
}

export const addLike = (blog) => {
    return async dispatch => {
        blogService
            .addLike(blog)
            .catch(error =>
            { dispatch(setNoti(error.response.data.error)) })
        dispatch(likeBlog(blog))
    }
}

export const deleteBlog = (blog) => {
    return async dispatch => {
        blogService
            .remove(blog)
            .catch(error =>
            { dispatch(setNoti(error.response.data.error)) })
        dispatch(removeBlog(blog))
    }
}

export const addCommentBlog = (blog) => {
    return async dispatch => {
        blogService
        .addComment(blog)
        .catch(error =>
        { dispatch(setNoti(error.response.data.error)) })
        dispatch(addComment(blog))
    }
}



export const {appendBlog,setBlogs,likeBlog,removeBlog,addComment} = blogsReducer.actions
export default blogsReducer.reducer
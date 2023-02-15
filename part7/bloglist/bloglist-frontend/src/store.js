import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import infoReducer from './reducers/infoReducer'
import userReducer from './reducers/userReducer'
import detailReducer from './reducers/detailReducer'
const store = configureStore({
    reducer: {
    noti: notificationReducer,
    blogs: blogsReducer,
    info: infoReducer,
    users: userReducer,
    detail: detailReducer
    }
})

export default store
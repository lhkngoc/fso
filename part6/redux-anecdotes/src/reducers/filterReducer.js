import { createSlice } from '@reduxjs/toolkit'


const filterReducer = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        filterArr: (state, action) => {
            return action.payload
        }
    }
})

export const { filterArr} = filterReducer.actions

export default filterReducer.reducer

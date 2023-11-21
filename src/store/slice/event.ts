import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const name = 'events'

const initialState = {
    drawerState: false,
}

export const eventSlice = createSlice({
    name: name,
    initialState: initialState,
    reducers: {
        setDrawerState: (state, action) => {
            state.drawerState = action.payload
        },
    },
})

export const { setDrawerState } = eventSlice.actions
export const eventSelector = (state: RootState) => state.eventReducer
export default eventSlice.reducer

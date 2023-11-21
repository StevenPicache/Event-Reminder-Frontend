import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { EventFormData } from '../../types/event'

const name = 'events'

const initialStateValue: EventFormData = {
    firstName: '',
    lastName: '',
    eventSelectType: '',
    eventType: '',
    eventDate: null,
}

const initialState = {
    drawerState: false,
    editDataFromState: initialStateValue,
}

export const eventSlice = createSlice({
    name: name,
    initialState: initialState,
    reducers: {
        setDrawerState: (state, action) => {
            state.drawerState = action.payload
        },
        setEditFormDataState: (state, action) => {
            state.editDataFromState = { ...action.payload }
        },
    },
})

export const { setDrawerState, setEditFormDataState } = eventSlice.actions
export const eventSelector = (state: RootState) => state.eventReducer
export default eventSlice.reducer

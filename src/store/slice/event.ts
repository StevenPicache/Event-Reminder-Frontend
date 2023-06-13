import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const name = 'events'

const initialState = {
  currentSelectedDrawer: 'Home',
  drawerState: false,
  sortAscending: true,
}
export const eventSlice = createSlice({
  name: name,
  initialState: initialState,
  reducers: {
    setDrawerText: (state, action) => {
      state.currentSelectedDrawer = action.payload
    },
    setDrawerState: (state, action) => {
      state.drawerState = action.payload
    },
  },
})

export const { setDrawerText, setDrawerState } = eventSlice.actions

export const eventSelector = (state: RootState) => state.eventReducer

export default eventSlice.reducer

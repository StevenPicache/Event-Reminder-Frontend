import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState = {
  currentSelectedDrawer: 'Home',
  drawerState: false,
}
export const celebrationSlice = createSlice({
  name: 'celebrations',
  initialState: initialState,
  reducers: {
    setDrawerText: (state, action) => {
      console.log(action.payload)
      state.currentSelectedDrawer = action.payload
    },
    setDrawerState: (state, action) => {
      state.drawerState = action.payload
    },
  },
})

export const { setDrawerText, setDrawerState } = celebrationSlice.actions

export const celebrationSelector = (state: RootState) =>
  state.celebrationReducer

export default celebrationSlice.reducer

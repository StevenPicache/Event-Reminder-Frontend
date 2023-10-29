import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const celebrationSlice = createSlice({
  name: 'celebrations',
  initialState: {},
  reducers: {},
})

export const celebrationSelector = (state: RootState) =>
  state.celebrationReducer

export default celebrationSlice.reducer

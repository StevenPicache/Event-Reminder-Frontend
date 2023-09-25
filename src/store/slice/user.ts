import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { LoginData, User } from '../../types/user'

const user: User = {
  email: '',
  password: '',
  token: '',
}

const initialState = {
  user: user,
  isAuthenticated: false,
  loading: false,
}

export const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User>) => {
      state.user.email = action.payload.email
      state.user.password = action.payload.password
      state.user.token = action.payload.token
    },
  },
})

export const { setCredentials } = userSlice.actions
export const userSelector = (state: RootState) => state.userReducer
export default userSlice.reducer

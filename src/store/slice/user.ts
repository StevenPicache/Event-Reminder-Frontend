import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { User } from '../../types/user'
import { userEndpoints } from '../endpoint/login'

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
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userEndpoints.endpoints.loginUser.matchFulfilled,
        (state, action) => {
          const { isAuthenticated, token } = action.payload
          state.isAuthenticated = isAuthenticated
          state.user.token = token
        },
      )
      .addMatcher(userEndpoints.endpoints.loginUser.matchRejected, (state) => {
        state.isAuthenticated = false
      })
  },
})

export const { setCredentials } = userSlice.actions
export const userSelector = (state: RootState) => state.userReducer
export default userSlice.reducer

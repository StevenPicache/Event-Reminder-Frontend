import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store/store'
import { User, LoginData } from '../types/user'
import LoginService from '../service/LoginService'

const path = 'login/LoginUser'

export const login = createAsyncThunk(
  path,
  async ({ email, password }: LoginData) => {
    const response = await LoginService.loginUser(email, password)
    return response
  },
)

const user: User = {
  firstName: '',
  lastName: '',
  password: '',
  email: '',
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
    addUser: (state, action: PayloadAction<User>) => {
      state.user.firstName = action.payload.firstName
      state.user.lastName = action.payload.lastName
      state.user.password = action.payload.password
      state.user.email = action.payload.email
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state) => {
      state.loading = false
      console.log('loading fullfillled', state.loading)
      state.isAuthenticated = true
    })

    builder.addCase(login.pending, (state) => {
      state.loading = true
      console.log('loading pending', state.loading)
    })

    builder.addCase(login.rejected, (state) => {
      state.loading = false
      console.log('loading rejected', state.loading)
    })
  },
})

export const { addUser } = userSlice.actions
export const userSelector = (state: RootState) => state.userReducer
export default userSlice.reducer

/// TODO: STUDY TESTING

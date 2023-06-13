import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { User, LoginData } from '../types/user'
import LoginService from '../service/LoginService';
import { log } from 'console';

const path = 'login/LoginUser';


export const login = createAsyncThunk(
  path,
  async ({email , password} : LoginData) => {
    console.log('REACHED THE THUNK');
    const response = await LoginService.loginUser(email, password);
    return response;
  }
)


const user: User = {
      firstName: '',
      lastName: '',
      password: '',
      email: '',
}

const initialState = {
  user: user,
  loading: false
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
    builder.addCase(login.fulfilled, (state,action) => {


      console.log('FULLFILLED')


      state.loading = false
      console.log(action.payload)
      console.log(action.payload)
      // DO SOMETHING WITH THE RETURNED DATA
    })

    builder.addCase(login.pending, (state) => {
      state.loading = true
    })

    builder.addCase(login.rejected, (state) => {
      state.loading = false

      /// SOMETHING HAPPENED LET THE USER KNOW
    })
  }
});

export const { addUser } = userSlice.actions;
export const userSelector = (state: RootState) => state.userReducer;
export default userSlice.reducer;
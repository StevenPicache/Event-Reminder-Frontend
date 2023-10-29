import { userApi } from '../api/user'
import { LoginData } from '../../types/user'

export type LoginRequest = {
  username: string
  password: string
}

export type LoginResponse = {
  isAuthenticated: boolean
  token: string
}
const API_LOGIN_PATH = '/auth/v0/login'
const API_LOGOUT_PATH = '/auth/v0/logout'

export const userEndpoints = userApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation<LoginResponse, LoginData>({
      query: (body) => ({
        url: API_LOGIN_PATH,
        method: 'POST',
        body: body,
      }),
    }),
    logoutUser: build.mutation<LoginResponse, LoginData>({
      query: (body) => ({
        url: API_LOGOUT_PATH,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: false,
})

export const { useLoginUserMutation, useLogoutUserMutation } = userEndpoints
export const {
  endpoints: { loginUser },
} = userEndpoints

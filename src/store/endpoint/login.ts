import { userApi } from '../api/user'
import { LoginData, User } from '../../types/user'

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  isAuthenticated: boolean
  token: string
}

export const loginApi = userApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation<LoginResponse, LoginData>({
      query: (body) => ({
        url: '/auth/v0/login',
        method: 'POST',
        body: body,
      }),
    }),
    logoutUser: build.mutation<LoginResponse, LoginData>({
      query: (body) => ({
        url: '/auth/v0/logout',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: false,
})

export const { useLoginUserMutation, useLogoutUserMutation } = loginApi
export const {
  endpoints: { loginUser },
} = loginApi

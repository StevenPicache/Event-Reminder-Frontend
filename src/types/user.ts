export interface User {
  firstName?: string
  lastName?: string
  email: string
  password: string
  token: string
}

export interface LoginData {
  email: string
  password: string
}

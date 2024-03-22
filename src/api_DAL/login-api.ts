import { instanse } from './todolists-api'
import { Response } from './tasks-api'

export type LoginParams = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: boolean
}

export type CheckAuthResponse = {
  id: number
  email: string
  login: string
}

export const authApi = {
  login(params: LoginParams) {
    return instanse.post<Response<{ userId?: number }>>('auth/login', params)
  },

  checkAuthMe() {
    return instanse.get<Response<CheckAuthResponse>>('/auth/me')
  },

  logOut() {
    return instanse.delete<Response>('/auth/login')
  },
}

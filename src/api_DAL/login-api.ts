import { instance } from 'api_DAL'
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
    return instance.post<Response<{ userId?: number }>>('auth/login', params)
  },

  checkAuthMe() {
    return instance.get<Response<CheckAuthResponse>>('/auth/me')
  },

  logOut() {
    return instance.delete<Response>('/auth/login')
  },
}

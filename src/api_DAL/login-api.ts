import { instance } from 'api_DAL'
import { LoginParams, Response } from '../common/types'

type CheckAuthResponse = {
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

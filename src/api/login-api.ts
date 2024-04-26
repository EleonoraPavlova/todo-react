import { instance } from 'api'
import { LoginParams, ResponseData } from '../common/types'

type CheckAuthResponse = {
  id: number
  email: string
  login: string
}

export const authApi = {
  login(params: LoginParams) {
    return instance.post<ResponseData<{ userId?: number }>>('auth/login', params)
  },

  checkAuthMe() {
    return instance.get<ResponseData<CheckAuthResponse>>('/auth/me')
  },

  logOut() {
    return instance.delete<ResponseData>('/auth/login')
  },
}

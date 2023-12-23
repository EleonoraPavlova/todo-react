import { instanse } from "./todolists-api"
import { ResponseType } from "./tasks-api"


export type LoginParamsTypeApi = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: boolean
}

export const authApi = {
  login(params: LoginParamsTypeApi) {
    return instanse.post<ResponseType<{ userId?: number }>>("auth/login", params)
  }
}
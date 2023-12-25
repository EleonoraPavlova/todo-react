import { authApi } from "../../api_DAL/login-api"
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils"
import { setIsLoggedInAC } from "../auth-reducers/auth-reducer"
import { appStartState } from "../initialState/appStartState"
import { AppThunkType } from "../storeBLL"
import { ResultCode } from "../tasks-reducers/tasks-reducer"

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type initialStateType = {
  status: RequestStatusType,
  error: string | null,
  success: string | null,
  initialized: boolean // инициализ приложения, проверка отображать todolists or not
}

export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusType = ReturnType<typeof setAppStatusAC>
export type SetAppSuccessType = ReturnType<typeof setAppSuccessAC>
export type SetAppInitializedType = ReturnType<typeof setAppInitializedAC>

export type ActionsAppType = SetAppErrorType
  | SetAppStatusType
  | SetAppSuccessType
  | SetAppInitializedType

export const appReducer = (state: initialStateType = appStartState, action: ActionsAppType): initialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status }
    case 'APP/SET-ERROR':
      return { ...state, error: action.error }
    case 'APP/SET-SUCCESS':
      return { ...state, success: action.success }
    case 'APP/INITIALIZED':
      return { ...state, initialized: action.initialized }
    default:
      return state
  }
}


export const setAppInitializedAC = (initialized: boolean) => {
  return { type: 'APP/INITIALIZED', initialized } as const
}

export const setAppErrorAC = (error: string | null) => {
  return { type: 'APP/SET-ERROR', error } as const
}

export const setAppStatusAC = (status: RequestStatusType) => {
  return { type: 'APP/SET-STATUS', status } as const
}

export const setAppSuccessAC = (success: string | null) => {
  return { type: 'APP/SET-SUCCESS', success } as const
}

//thunk
export const setAppInitializeTC = (): AppThunkType =>  //функц прослойка для dispatch api
  async dispatch => {
    try {
      const res = await authApi.checkAuthMe()
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(setIsLoggedInAC(true))// анонимный пользователь или авторизованный
        dispatch(setAppInitializedAC(true))
      } else {
        handleServerAppError(res.data.messages, dispatch)
      }
      dispatch(setAppInitializedAC(true))
    } catch (err) {
      handleServerNetworkError(err, dispatch) //обработка серверных ошибок
    }
  }
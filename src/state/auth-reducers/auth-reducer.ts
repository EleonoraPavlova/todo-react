//BLL
import { AppThunkType } from "../storeBLL";
import { setAppStatusAC, setAppSuccessAC } from "../app-reducer/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils";
import { LoginParamsTypeApi, authApi } from "../../api_DAL/login-api";
import { ResultCode } from "../tasks-reducers/tasks-reducer";
import { getTodolistTC } from "../todoList-reducers/todolists-reducer";

//type ActionsType = ReturnType<typeof getTodosAC> | ReturnType<typeof changeTodoStatusAC>

export type ActionsAuthType = ReturnType<typeof setIsLoggedInAC>

export type initialAuthStateType = {
  email: string,
  password: string,
  rememberMe: boolean,
  isLoggedIn: boolean
}

export const initialAuthState: initialAuthStateType = {
  email: '',
  password: '',
  rememberMe: false,
  isLoggedIn: false
}

export const authReducer = (state = initialAuthState, action: ActionsAuthType): initialAuthStateType => {
  switch (action.type) {
    case "LOGIN/SET-IS-LOGGED-IN": {
      return { ...state, isLoggedIn: action.isLoggedIn }
    }
    default:
      return state;
  }
}

//action creator
export const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return { type: 'LOGIN/SET-IS-LOGGED-IN', isLoggedIn } as const
}


export const loginTC = (params: LoginParamsTypeApi): AppThunkType =>  //функц прослойка для dispatch api
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await authApi.login(params)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(setIsLoggedInAC(true))
        dispatch(getTodolistTC())
        dispatch(setAppSuccessAC("Authorization was successful"))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data.messages, dispatch)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
    }
  }


export const logOutTC = (): AppThunkType =>  //функц прослойка для dispatch api
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await authApi.logOut()
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(setIsLoggedInAC(false))
        dispatch(setAppSuccessAC("You have successfully logged out"))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data.messages, dispatch)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
    }
  }
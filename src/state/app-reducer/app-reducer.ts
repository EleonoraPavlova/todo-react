import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { authApi } from "../../api_DAL/login-api"
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils"
import { setIsLoggedInAC } from "../auth-reducers/auth-reducer"
import { ResultCode } from "../tasks-reducers/tasks-reducer"
import { getTodolistTC } from "../todoList-reducers/todolists-reducer"
import { AppThunkType } from "../storeBLL"

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type appStartStateType = {
  status: RequestStatusType,
  error: string | null,
  success: string | null,
  initialized: boolean
}

export const appStartState: appStartStateType = {
  status: "idle", //without load
  error: null,
  success: null,
  initialized: false //when no auth (check user, settings, ect) // инициализ приложения, проверка отображать todolists or not
}

const slice = createSlice({
  name: "app",
  initialState: appStartState,
  reducers: {
    setAppInitializedAC(state, action: PayloadAction<{ initialized: boolean }>) {
      state.initialized = action.payload.initialized
    },
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    },
    setAppSuccessAC(state, action: PayloadAction<{ success: string | null }>) {
      state.success = action.payload.success
    }
  }
})

export const appReducer = slice.reducer
export const { setAppInitializedAC, setAppErrorAC, setAppStatusAC, setAppSuccessAC } = slice.actions


//thunk
export const setAppInitializeTC = (): AppThunkType =>  //функц прослойка для dispatch api
  async dispatch => {
    dispatch(setAppStatusAC({ status: "loading" }))
    try {
      const res = await authApi.checkAuthMe()
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(setIsLoggedInAC({ value: true }))// анонимный пользователь или авторизованный
        dispatch(setAppInitializedAC({ initialized: true }))
        dispatch(getTodolistTC())
      } else {
        handleServerAppError(res.data.messages, dispatch)
      }
      dispatch(setAppInitializedAC({ initialized: true }))
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch) //обработка серверных ошибок
    }
  }
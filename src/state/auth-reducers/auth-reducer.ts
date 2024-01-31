//BLL
import { setAppStatusAC, setAppSuccessAC } from "../app-reducer/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils";
import { LoginParamsTypeApi, authApi } from "../../api_DAL/login-api";
import { ResultCode, clearTasksAC } from "../tasks-reducers/tasks-reducer";
import { clearTodolistAC, getTodolistTC } from "../todoList-reducers/todolists-reducer";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunkType } from "../storeBLL";


export const initialAuthState = {
  email: '',
  password: '',
  rememberMe: false,
  isLoggedIn: false
}

const slice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value
    }
  }
})

export const authReducer = slice.reducer
export const { setIsLoggedInAC } = slice.actions

export const loginTC = (params: LoginParamsTypeApi): AppThunkType =>  //функц прослойка для dispatch api
  async dispatch => {
    dispatch(setAppStatusAC({ status: "loading" }))
    try {
      const res = await authApi.login(params)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(setIsLoggedInAC({ value: true }))
        // dispatch(getTodolistTC())
        dispatch(setAppSuccessAC({ success: "Authorization was successful" }))
        dispatch(setAppStatusAC({ status: 'succeeded' }))
      } else {
        handleServerAppError(res.data.messages, dispatch)
      }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
    }
  }


export const logOutTC = (): AppThunkType =>  //функц прослойка для dispatch api
  async dispatch => {
    dispatch(setAppStatusAC({ status: "loading" }))
    try {
      const res = await authApi.logOut()
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(setIsLoggedInAC({ value: false }))
        dispatch(setAppSuccessAC({ success: "You have successfully logged out" }))
        dispatch(setAppStatusAC({ status: 'succeeded' }))
        dispatch(clearTasksAC({}))
        dispatch(clearTodolistAC())
      } else {
        handleServerAppError(res.data.messages, dispatch)
      }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
    }
  }
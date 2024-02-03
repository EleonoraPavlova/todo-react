//BLL
import { setAppStatusAC, setAppSuccessAC } from "../app-reducer/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils";
import { LoginParamsTypeApi, authApi } from "../../api_DAL/login-api";
import { ResultCode, clearTasksAC } from "../tasks-reducers/tasks-reducer";
import { clearTodolistAC, getTodolistTC } from "../todoList-reducers/todolists-reducer";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppThunkType } from "../storeBLL";
import { AxiosError } from "axios";
import { FieldErrorType } from "api_DAL/tasks-api";


export const initialAuthState = {
  email: '',
  password: '',
  rememberMe: false,
  isLoggedIn: false
}


export const loginTC = createAsyncThunk<{ isLoggedIn: boolean }, LoginParamsTypeApi, {
  rejectValue: { errors: string[], fieldsError?: FieldErrorType[] }
}>("auth/login", async (params, thunkApi) => {
  thunkApi.dispatch(setAppStatusAC({ status: "loading" }))
  try {
    const res = await authApi.login(params)
    debugger
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      // thunkApi.dispatch(setIsLoggedInAC({ isLoggedIn: true }))
      // dispatch(getTodolistTC())
      thunkApi.dispatch(setAppSuccessAC({ success: "Authorization was successful" }))
      thunkApi.dispatch(setAppStatusAC({ status: 'succeeded' }))
      return { isLoggedIn: true }
    } else {
      handleServerAppError(res.data.messages, thunkApi.dispatch)
      return thunkApi.rejectWithValue({ errors: res.data.messages, fieldsError: res.data.fieldsErrors })
    }
  } catch (err) {
    const error: AxiosError = err;
    handleServerNetworkError(err as { message: string }, thunkApi.dispatch)
    return thunkApi.rejectWithValue({
      errors: [error.message], fieldsError: undefined
    })
  }
})



const slice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginTC.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
  },
})

export const authReducer = slice.reducer
export const { setIsLoggedInAC } = slice.actions


export const loginTC_ = (params: LoginParamsTypeApi): AppThunkType =>  //функц прослойка для dispatch api
  async dispatch => {
    dispatch(setAppStatusAC({ status: "loading" }))
    try {
      const res = await authApi.login(params)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(setIsLoggedInAC({ isLoggedIn: true }))
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
        dispatch(setIsLoggedInAC({ isLoggedIn: false }))
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
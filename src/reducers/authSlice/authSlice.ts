//BLL
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { FieldError } from 'api_DAL/tasks-api'
import { clearTasksTodolists } from 'actions/actions'
import { LoginParams, authApi } from 'api_DAL/login-api'
import { setAppStatusAC, setAppSuccessAC } from 'reducers/appSlice/appSlice'
import { ResultCode } from 'reducers/tasksSlice/tasksSlice'
import { handleServerAppError, handleServerNetworkError } from 'utils'

export const initialAuthState = {
  email: '',
  password: '',
  rememberMe: false,
  isLoggedIn: false,
}

export const loginTC = createAsyncThunk<
  { isLoggedIn: boolean },
  LoginParams,
  {
    rejectValue: { errors: string[]; fieldsErrors?: FieldError[] }
  }
>('auth/login', async (params, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC({ status: 'loading' }))
  try {
    const res = await authApi.login(params)
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      //dispatch(setIsLoggedInAC({ isLoggedIn: true })) //   return { isLoggedIn: true }
      dispatch(setAppSuccessAC({ success: 'Authorization was successful' }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
      return { isLoggedIn: true }
    } else {
      handleServerAppError(res.data.messages, dispatch)
      return rejectWithValue({ errors: res.data.messages, fieldsErrors: res.data.fieldsErrors })
    }
  } catch (err: unknown) {
    const error: AxiosError = err as AxiosError
    handleServerNetworkError(err as { message: string }, dispatch)
    return rejectWithValue({
      errors: [error.message],
      fieldsErrors: undefined,
    })
  }
})

export const logOutTC = createAsyncThunk('auth/logOut', async (param, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC({ status: 'loading' }))
  try {
    const res = await authApi.logOut()
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      // dispatch(setIsLoggedInAC({ isLoggedIn: false }))
      dispatch(setAppSuccessAC({ success: 'You have successfully logged out' }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
      dispatch(clearTasksTodolists())
      return { isLoggedIn: false }
    } else {
      handleServerAppError(res.data.messages, dispatch)
      return rejectWithValue({})
    }
  } catch (err: unknown) {
    const error: AxiosError = err as AxiosError
    handleServerNetworkError(error as { message: string }, dispatch)
    return rejectWithValue({})
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginTC.fulfilled, (state) => {
        state.isLoggedIn = true
      })
      .addCase(logOutTC.fulfilled, (state) => {
        state.isLoggedIn = false
      })
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const authReducer = authSlice.reducer
export const { setIsLoggedInAC } = authSlice.actions
export const { selectIsLoggedIn } = authSlice.selectors

//BLL
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { clearTasksTodolists } from 'BLL/actions/actions'
import { authApi } from 'api_DAL/login-api'
import { setAppStatusAC, setAppSuccessAC } from '../appSlice'
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from 'common/utils'
import { LoginParams, ThunkErrorApiConfig } from 'common/types'
import { ResultCode } from 'common/enums'
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk'

export const initialAuthState = {
  email: '',
  password: '',
  rememberMe: false,
  isLoggedIn: false,
}

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

const loginTC = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParams, AsyncThunkConfig>(
  `${authSlice.name}/login`,
  async (params, { dispatch, rejectWithValue }) => {
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
        fieldsErrors: error,
      })
    }
  }
)

const logOutTC = createAppAsyncThunk<{ isLoggedIn: boolean }>(
  `${authSlice.name}/logOut`,
  async (param, { dispatch, rejectWithValue }) => {
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
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  }
)

export const authReducer = authSlice.reducer
export const authThunks = { loginTC, logOutTC }
export const { setIsLoggedInAC } = authSlice.actions
export const { selectIsLoggedIn } = authSlice.selectors

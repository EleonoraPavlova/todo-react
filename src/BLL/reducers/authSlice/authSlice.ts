//BLL
import { PayloadAction, createSlice, isAnyOf, isFulfilled } from '@reduxjs/toolkit'
import { clearTasksTodolists } from 'BLL/actions/actions'
import { authApi } from 'api/login-api'
import { appThunks, setAppSuccessAC } from '../appSlice'
import { createAppAsyncThunk, handleServerAppError, thunkTryCatch } from 'common/utils'
import { LoginParams } from 'common/types'
import { ResultCode } from 'common/enums'

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
      // .addCase(loginTC.fulfilled, (state) => {
      //   state.isLoggedIn = true
      // })
      // .addCase(logOutTC.fulfilled, (state) => {
      //   state.isLoggedIn = false
      // })
      .addMatcher(isFulfilled(loginTC, logOutTC), (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
        //appThunks.setAppInitializeTC?? need or not
        state.isLoggedIn = action.payload.isLoggedIn
      })
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

const loginTC = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParams>(
  `${authSlice.name}/login`,
  (params, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.login(params)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        //dispatch(setIsLoggedInAC({ isLoggedIn: true })) //   return { isLoggedIn: true }
        dispatch(setAppSuccessAC({ success: 'Authorization was successful' }))
        return { isLoggedIn: true }
      } else {
        const isShowAppError = !!res.data.messages
        handleServerAppError(res.data.messages, dispatch, isShowAppError)
        return rejectWithValue({ errors: res.data.messages, fieldsErrors: res.data.fieldsErrors })
      }
    })
  }
)

const logOutTC = createAppAsyncThunk<{ isLoggedIn: boolean }>(`${authSlice.name}/logOut`, (param, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.logOut()
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      // dispatch(setIsLoggedInAC({ isLoggedIn: false }))
      dispatch(setAppSuccessAC({ success: 'You have successfully logged out' }))
      dispatch(clearTasksTodolists())
      return { isLoggedIn: false }
    } else {
      handleServerAppError(res.data.messages, dispatch)
      return rejectWithValue({ errors: res.data.messages, fieldsErrors: res.data.fieldsErrors })
    }
  })
})

export const authReducer = authSlice.reducer
export const authThunks = { loginTC, logOutTC }
export const { setIsLoggedInAC } = authSlice.actions
export const { selectIsLoggedIn } = authSlice.selectors

import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { setIsLoggedInAC } from '../authSlice'
import { handleServerAppError } from 'common/utils/handleServerAppError'
import { createAppAsyncThunk, handleServerNetworkError } from 'common/utils'
import { ResultCode } from 'common/enums'
import { RequestStatus } from 'common/types'
import { authApi } from 'api_DAL/login-api'

type AppStartState = {
  status: RequestStatus
  error: string | null
  success: string | null
  initialized: boolean
}

export const appStartState: AppStartState = {
  status: 'idle', //without load
  error: null,
  success: null,
  initialized: false, //when no auth (check user, settings, ect) // инициализ приложения, проверка отображать todolists or not
}

const appSlice = createSlice({
  name: 'app',
  initialState: appStartState,
  reducers: {
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatus }>) {
      state.status = action.payload.status
    },
    setAppSuccessAC(state, action: PayloadAction<{ success: string | null }>) {
      state.success = action.payload.success
    },
  },
  extraReducers: (builder) => {
    //для обработки чужих редьюсеров
    builder.addCase(setAppInitializeTC.fulfilled, (state) => {
      state.initialized = true
    })
  },
  selectors: {
    selectAppStatus: (sliceState) => sliceState.status,
    selectAppError: (sliceState) => sliceState.error,
    selectAppSuccess: (sliceState) => sliceState.success,
    selectAppInitialized: (sliceState) => sliceState.initialized,
  },
})

const setAppInitializeTC = createAppAsyncThunk<{ initialized: boolean }>(
  `${appSlice.name}/appInitialize`,
  async (params, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await authApi.checkAuthMe()
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(setIsLoggedInAC({ isLoggedIn: true })) // анонимный пользователь или авторизованный/and show loader of course
        // return { initialized: true }
      } else {
        handleServerAppError(res.data.messages, dispatch, false)
      }
      return { initialized: true }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  }
)

export const appReducer = appSlice.reducer
export const appThunks = { setAppInitializeTC }
export const { setAppErrorAC, setAppStatusAC, setAppSuccessAC } = appSlice.actions
export const { selectAppStatus, selectAppError, selectAppSuccess, selectAppInitialized } = appSlice.selectors

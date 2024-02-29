import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authApi } from '../../api_DAL/login-api'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { AxiosError } from 'axios'
import { ResultCode } from 'reducers/tasksSlice/tasksSlice'
import { setIsLoggedInAC } from 'reducers/authSlice/authSlice'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type appStartStateType = {
  status: RequestStatusType
  error: string | null
  success: string | null
  initialized: boolean
}

export const appStartState: appStartStateType = {
  status: 'idle', //without load
  error: null,
  success: null,
  initialized: false, //when no auth (check user, settings, ect) // инициализ приложения, проверка отображать todolists or not
}

//thunk
export const setAppInitializeTC = createAsyncThunk(
  'app/appInitialize',
  async (params, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await authApi.checkAuthMe()
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(setIsLoggedInAC({ isLoggedIn: true })) // анонимный пользователь или авторизованный
        // dispatch(setAppInitializedAC({ initialized: true }))
        // return { initialized: true }
      } else {
        return handleServerAppError(res.data.messages, dispatch)
        // rejectWithValue({ errors: res.data.messages, fieldsErrors: res.data.fieldsErrors })
      }
      return { initialized: true }
    } catch (err: unknown) {
      const error: AxiosError = err as AxiosError
      handleServerNetworkError(error as { message: string }, dispatch)
      return rejectWithValue(null)
    }
  }
)

const appSlice = createSlice({
  name: 'app',
  initialState: appStartState,
  reducers: {
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
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

export const appReducer = appSlice.reducer
export const { setAppErrorAC, setAppStatusAC, setAppSuccessAC } = appSlice.actions
export const { selectAppStatus, selectAppError, selectAppSuccess, selectAppInitialized } =
  appSlice.selectors

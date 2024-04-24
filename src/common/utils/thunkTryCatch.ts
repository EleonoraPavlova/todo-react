import { ResponseData, ThunkErrorApiConfig } from 'common/types'
import { handleServerNetworkError } from './handleServerNetworkError'
import { AppDispatch, AppRootState } from 'BLL/store'
import { setAppStatusAC } from 'BLL/reducers/appSlice'
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'

export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<AppRootState, unknown, AppDispatch, null | ResponseData | ThunkErrorApiConfig>,
  logic: () => Promise<T>
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(setAppStatusAC({ status: 'loading' }))
  try {
    return await logic()
  } catch (e) {
    handleServerNetworkError(e as { message: string }, dispatch)
    dispatch(setAppStatusAC({ status: 'failed' }))
    return rejectWithValue(null)
  } finally {
    dispatch(setAppStatusAC({ status: 'idle' }))
  }
}

// catch (err: unknown) {
//         const error: AxiosError = err as AxiosError
//         handleServerNetworkError(err as { message: string }, dispatch)
//         return rejectWithValue({
//           errors: [error.message],
//           fieldsErrors: undefined,
//         })

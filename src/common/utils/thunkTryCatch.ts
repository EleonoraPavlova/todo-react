import { ResponseData, ThunkErrorApiConfig } from 'common/types'
import { handleServerNetworkError } from './handleServerNetworkError'
import { AppDispatch, AppRootState } from 'BLL/store'
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'

export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<AppRootState, unknown, AppDispatch, null | ResponseData | ThunkErrorApiConfig>,
  logic: () => Promise<T>
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    return await logic()
  } catch (e) {
    handleServerNetworkError(e as { message: string }, dispatch)
    return rejectWithValue(null)
  }
}

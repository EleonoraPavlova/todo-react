import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, AppRootState } from 'BLL/store'
import { ResponseData, ThunkErrorApiConfig } from 'common/types'

/**
 * @param state - application root storage state
 * @param dispatch - event dispatch function
 * @param rejectValue - type of data returned when rejected thunks with error
 *
 * @return created asynchronous thunk
 */

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootState
  dispatch: AppDispatch
  rejectValue: ResponseData | ThunkErrorApiConfig | null
}>()

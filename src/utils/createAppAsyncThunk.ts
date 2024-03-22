import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, AppRootState } from 'app/storeBLL'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootState
  dispatch: AppDispatch
  rejectValue: null
}>()

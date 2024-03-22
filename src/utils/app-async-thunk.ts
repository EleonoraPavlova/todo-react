import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, AppRootState } from 'state/storeBLL'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootState
  dispatch: AppDispatch
  rejectValue: null
}>()

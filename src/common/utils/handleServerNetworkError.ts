import axios, { isAxiosError } from 'axios'
import { AppDispatch } from '../../app/storeBLL'
import { setAppErrorAC, setAppStatusAC } from 'reducers/appSlice/appSlice'

export const handleServerNetworkError = (err: unknown, dispatch: AppDispatch): void => {
  let errorMessage = 'Some error occurred'
  if (isAxiosError(err)) {
    errorMessage = err.response?.data?.message || err?.message || errorMessage
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`
  } else {
    errorMessage = JSON.stringify(err)
  }

  dispatch(setAppErrorAC({ error: errorMessage }))
  dispatch(setAppStatusAC({ status: 'failed' }))
}

// export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
//   dispatch(setAppErrorAC({ error: error.message ? error.message : 'Some error occurred' }))
//   dispatch(setAppStatusAC({ status: 'failed' }))
// }

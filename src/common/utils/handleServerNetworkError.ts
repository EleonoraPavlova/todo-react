import { isAxiosError } from 'axios'
import { AppDispatch } from '../../BLL/store'
import { setAppErrorAC } from 'BLL/reducers/appSlice/appSlice'

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
}

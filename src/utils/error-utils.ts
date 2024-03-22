import axios, { isAxiosError } from 'axios'
import { AppDispatch } from './../state/storeBLL'
import { setAppErrorAC, setAppStatusAC } from 'reducers/appSlice/appSlice'
import { Dispatch } from 'redux'

export const handleServerAppError = (messages: string[], dispatch: Dispatch) => {
  if (messages.length) {
    dispatch(setAppErrorAC({ error: messages[0] })) //приходит текст ошибки из сервера
  } else {
    dispatch(setAppErrorAC({ error: 'Some error occurred' })) //если не пришла из сервера, пишу вручную
  }
  dispatch(setAppStatusAC({ status: 'failed' }))
}

export const handleServerNetworkError = (err: unknown, dispatch: AppDispatch): void => {
  let errorMessage = 'Some error occurred'
  // ❗Проверка на наличие axios ошибки
  if (isAxiosError(err)) {
    // ⏺️ err.response?.data?.message - например получение тасок с невалидной todolistId
    // ⏺️ err?.message - например при создании таски в offline режиме
    errorMessage = err.response?.data?.message || err?.message || errorMessage
    // ❗ Проверка на наличие нативной ошибки
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`
    // ❗Какой-то непонятный кейс
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

import { SetAppErrorType, SetAppStatusType, setAppErrorAC, setAppStatusAC } from "../state/app-reducer/app-reducer"
import { Dispatch } from "redux"


export const handleServerAppError = <D>(messages: string[], dispatch: Dispatch<SetAppErrorType | SetAppStatusType>) => {
  if (messages.length) {
    dispatch(setAppErrorAC(messages[0])) //приходит текст ошибки из сервера
  } else {
    dispatch(setAppErrorAC("Some error occurred"))//если не пришла из сервера, пишу вручную
  }
  dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<SetAppErrorType | SetAppStatusType>) => {
  dispatch(setAppErrorAC(error.message ? error.message : "Some error occurred"))
  dispatch(setAppStatusAC('failed'))
}
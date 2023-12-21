import { setAppErrorAC, setAppStatusAC } from "../state/app-reducer/app-reducer"
import { Dispatch } from "redux"
// import { AppAllActionsType } from "../state/storeBLL"


export const handleServerAppError = <D>(messages: string[], dispatch: Dispatch) => {
  if (messages.length) {
    dispatch(setAppErrorAC(messages[0])) //приходит текст ошибки из сервера
  } else {
    dispatch(setAppErrorAC("Some error occurred"))//если не пришла из сервера, пишу вручную
  }
  dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: any, dispatch: Dispatch) => {
  dispatch(setAppErrorAC(error.message ? error.message : "Some error occurred"))
  dispatch(setAppStatusAC('failed'))
}
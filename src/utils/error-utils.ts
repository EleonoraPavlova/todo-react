import { setAppErrorAC, setAppStatusAC } from "../state/app-reducer/app-reducer"
import { Dispatch } from "redux"
// import { AppAllActionsType } from "../state/storeBLL"


export const handleServerAppError = (messages: string[], dispatch: Dispatch) => {
  if (messages.length) {
    dispatch(setAppErrorAC({ error: messages[0] })) //приходит текст ошибки из сервера
  } else {
    dispatch(setAppErrorAC({ error: "Some error occurred" }))//если не пришла из сервера, пишу вручную
  }
  dispatch(setAppStatusAC({ status: 'failed' }))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
  dispatch(setAppErrorAC({ error: error.message ? error.message : "Some error occurred" }))
  dispatch(setAppStatusAC({ status: 'failed' }))
}
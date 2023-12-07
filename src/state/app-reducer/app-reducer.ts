import { appStartState } from "../initialState/appStartState"

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type initialStateType = {
  status: RequestStatusType,
  error: string | null
}

export type SetErrorType = ReturnType<typeof setErrorAC>
export type SetStatusType = ReturnType<typeof setStatusAC>

type ActionsType = SetErrorType | SetStatusType

export const appReducer = (state: initialStateType = appStartState, action: ActionsType): initialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status }
    case 'APP/SET-ERROR':
      return { ...state, error: action.error }
    default:
      return state
  }
}


export const setErrorAC = (error: string | null) => {
  return { type: 'APP/SET-ERROR', error } as const
}

export const setStatusAC = (status: RequestStatusType) => {
  return { type: 'APP/SET-STATUS', status } as const
}
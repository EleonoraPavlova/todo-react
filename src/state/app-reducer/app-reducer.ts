import { appStartState } from "../initialState/appStartState"

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type initialStateType = {
  status: RequestStatusType,
  error: string | null,
  success: string | null
}

export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusType = ReturnType<typeof setAppStatusAC>
export type setAppSuccessType = ReturnType<typeof setAppSuccessAC>

export type ActionsAppType = SetAppErrorType | SetAppStatusType | setAppSuccessType

export const appReducer = (state: initialStateType = appStartState, action: ActionsAppType): initialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status }
    case 'APP/SET-ERROR':
      return { ...state, error: action.error }
    case 'APP/SET-SUCCESS':
      return { ...state, success: action.success }
    default:
      return state
  }
}


export const setAppErrorAC = (error: string | null) => {
  return { type: 'APP/SET-ERROR', error } as const
}

export const setAppStatusAC = (status: RequestStatusType) => {
  return { type: 'APP/SET-STATUS', status } as const
}

export const setAppSuccessAC = (success: string | null) => {
  return { type: 'APP/SET-SUCCESS', success } as const
}
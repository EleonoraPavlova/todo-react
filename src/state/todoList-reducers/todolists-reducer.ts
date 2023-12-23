//BLL
import { TodolistTypeApi, todolistsApi } from "../../api_DAL/todolists-api";
import { RequestStatusType, setAppStatusAC, setAppSuccessAC } from "../app-reducer/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils";
import { AppThunkType } from "../storeBLL";

export type RemoveTodoList = ReturnType<typeof removeTodolistAC>
export type AddTodoList = ReturnType<typeof addTodolistAC>
export type SetTodoList = ReturnType<typeof setTodolistAC>
export type ChangeStatusTodolist = ReturnType<typeof changeStatusTodolistAC>


export type ActionsTodolistsType =  //общий тип!
  ReturnType<typeof changeTitleTodolistAC>
  | ReturnType<typeof changeFilterTodolistAC>
  | RemoveTodoList
  | AddTodoList
  | SetTodoList
  | ChangeStatusTodolist

export type FilterValuesType = "all" | "completed" | "active"

export type TodolistDomainType = TodolistTypeApi & { // расширяем типов, которые приходят с аpi c нужными нам фильтрами
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

export const initialState: TodolistDomainType[] = []


//функция не имеет право менять state! сначала нужно создать копию
export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsTodolistsType): TodolistDomainType[] => { //должны всегда вернуть массив
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter(t => t.id !== action.todolistId)
    }
    case "ADD-TODOLIST": {
      const newTodolist: TodolistDomainType = { ...action.todolist, filter: "all", entityStatus: "idle" } //todolist который приходит с сервера и добавила нужное мне расширение
      //положили старые листы в массив и добавили новый(объект)!
      return [newTodolist, ...state]
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map(t => t.id === action.todolistId ? { ...t, title: action.title } : t)
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map(t => t.id === action.todolistId ? { ...t, filter: action.filter } : t)
    }
    case "CHANGE-TODOLIST-STATUS": {
      return state.map(t => t.id === action.todolistId ? { ...t, entityStatus: action.entityStatus } : t)
    }
    case "SET-TODOLIST": {
      //установка прилетеших из сервера тудулитсов с нужным нам дополнительным расширением filter
      return action.todolists.map(tl => {
        return {
          ...tl,
          filter: "all",
          entityStatus: "idle"
        }
      })
    }
    default:
      return state;
  }
}


//action creator
export const removeTodolistAC = (todolistId: string) => {
  return { type: 'REMOVE-TODOLIST', todolistId } as const
}

export const addTodolistAC = (todolist: TodolistTypeApi) => {
  return {
    type: 'ADD-TODOLIST', todolist
  } as const
}

export const changeTitleTodolistAC = (title: string, todolistId: string) => {
  return {
    type: 'CHANGE-TODOLIST-TITLE', todolistId, title
  } as const
}

export const changeFilterTodolistAC = (filter: FilterValuesType, todolistId: string) => {
  return {
    type: 'CHANGE-TODOLIST-FILTER', todolistId, filter
  } as const
}

export const changeStatusTodolistAC = (entityStatus: RequestStatusType, todolistId: string) => {
  return {
    type: 'CHANGE-TODOLIST-STATUS', entityStatus, todolistId
  } as const
}

export const setTodolistAC = (todolists: TodolistTypeApi[]) => { //фиксирую прилетевшие с сервера todolists
  return {
    type: 'SET-TODOLIST', todolists
  } as const
}

//thunk
export const getTodolistTC = (): AppThunkType => { //функц прослойка для dispatch api
  return (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.getTodoslists()
      .then((res) => {
        dispatch(setTodolistAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}

export const removeTodolistTC = (todolistId: string): AppThunkType => { //функц прослойка для dispatch api
  return (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeStatusTodolistAC('loading', todolistId))
    todolistsApi.deleteTodoslist(todolistId)
      .then((res) => {
        dispatch(removeTodolistAC(todolistId))
        dispatch(setAppSuccessAC("todolist was successful removed"))
        dispatch(setAppStatusAC('succeeded'))
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })

  }
}

export const addTodolistTC = (title: string): AppThunkType => { //функц прослойка для dispatch api
  return (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.createTodoslist(title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(addTodolistAC(res.data.data.item))
          dispatch(setAppSuccessAC("todolist was successful added"))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerAppError(res.data.messages, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}

export const changeTitleTodolistTC = (todolistId: string, title: string): AppThunkType => { //функц прослойка для dispatch api
  return (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.updateTodoslist(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(changeTitleTodolistAC(title, todolistId))
          dispatch(setAppSuccessAC("todolist title was successful change"))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerAppError(res.data.messages, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}

export const changeFilterTodolistTC = (todolistId: string, title: string, filter: FilterValuesType): AppThunkType => { //функц прослойка для dispatch api
  return (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.updateTodoslist(todolistId, title)
      .then((res) => {
        dispatch(changeFilterTodolistAC(filter, todolistId))
        dispatch(setAppStatusAC('succeeded'))
      }).catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}
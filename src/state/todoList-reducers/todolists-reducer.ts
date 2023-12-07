//BLL
import { TodolistTypeApi, todolistsApi } from "../../api_DAL/todolists-api";
import { Dispatch } from "redux";
import { RequestStatusType, setStatusAC } from "../app-reducer/app-reducer";

export type RemoveTodoList = ReturnType<typeof RemoveTodolistAC>
export type AddTodoList = ReturnType<typeof AddTodolistAC>
export type SetTodoList = ReturnType<typeof SetTodolistAC>

type ActionsType =  //общий тип!
  ReturnType<typeof ChangeTitleTodolistAC>
  | ReturnType<typeof ChangeFilterTodolistAC>
  | RemoveTodoList
  | AddTodoList
  | SetTodoList

export type FilterValuesType = "all" | "completed" | "active"

export type TodolistDomainType = TodolistTypeApi & { // расширяем типов, которые приходят с аpi c нужными нам фильтрами
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

export const initialState: TodolistDomainType[] = []


//функция не имеет право менять state! сначала нужно создать копию
export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => { //должны всегда вернуть массив
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
      return state.map(t => t.id === action.id ? { ...t, filter: action.filter } : t)
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
export const RemoveTodolistAC = (todolistId: string) => {
  return { type: 'REMOVE-TODOLIST', todolistId } as const
}

export const AddTodolistAC = (todolist: TodolistTypeApi) => {
  return {
    type: 'ADD-TODOLIST', todolist
  } as const
}

export const ChangeTitleTodolistAC = (title: string, todolistId: string) => {
  return {
    type: 'CHANGE-TODOLIST-TITLE', todolistId, title
  } as const
}

export const ChangeFilterTodolistAC = (filter: FilterValuesType, id: string) => {
  return {
    type: 'CHANGE-TODOLIST-FILTER', id, filter
  } as const
}


export const SetTodolistAC = (todolists: TodolistTypeApi[]) => { //фиксирую прилетевшие с сервера todolists
  return {
    type: 'SET-TODOLIST', todolists
  } as const
}

export const getTodolistTC = (dispatch: Dispatch) => { //функц прослойка для dispatch api
  dispatch(setStatusAC('loading'))
  todolistsApi.getTodoslists()
    .then((res) => {
      dispatch(SetTodolistAC(res.data))
      dispatch(setStatusAC('succeeded'))
    })
}

export const removeTodolistTC = (todolistId: string) => { //функц прослойка для dispatch api
  return (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistsApi.deleteTodoslist(todolistId)
      .then((res) => {
        dispatch(RemoveTodolistAC(todolistId))
        dispatch(setStatusAC('succeeded'))
      })
  }
}

export const addTodolistTC = (title: string) => { //функц прослойка для dispatch api
  return (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistsApi.createTodoslist(title)
      .then((res) => {
        dispatch(AddTodolistAC(res.data.data.item))
        dispatch(setStatusAC('succeeded'))
      })
  }
}

export const changeTitleTodolistTC = (todolistId: string, title: string) => { //функц прослойка для dispatch api
  return (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistsApi.updateTodoslist(todolistId, title)
      .then((res) => {
        dispatch(ChangeTitleTodolistAC(title, todolistId))
        dispatch(setStatusAC('succeeded'))
      })
  }
}

export const changeFilterTodolistTC = (todolistId: string, title: string, filter: FilterValuesType) => { //функц прослойка для dispatch api
  return (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistsApi.updateTodoslist(todolistId, title)
      .then((res) => {
        dispatch(ChangeFilterTodolistAC(filter, todolistId))
        dispatch(setStatusAC('succeeded'))
      })
  }
}
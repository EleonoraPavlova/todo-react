import { v1 } from "uuid";
import { TodolistTypeApi, todolistsApi } from "../../api/todolists-api";
import { Dispatch } from "redux";

export type RemoveTodoList = ReturnType<typeof RemoveTodolistAC>
export type AddTodoList = ReturnType<typeof AddTodolistAC>
export type ChangeTitleTodoList = ReturnType<typeof ChangeTitleTodolistAC>
export type ChangeFilterTodoList = ReturnType<typeof ChangeFilterTodolistAC>
export type SetTodoList = ReturnType<typeof SetTodolistAC>


type ActionsType =  //общий тип!
  RemoveTodoList
  | AddTodoList
  | ChangeTitleTodoList
  | ChangeFilterTodoList
  | SetTodoList

export type FilterValuesType = "all" | "completed" | "active"

export type TodolistDomainType = TodolistTypeApi & { // расширяем типов, которые приходят с аpi c нужными нам фильтрами
  filter: FilterValuesType
}

export const initialState: TodolistDomainType[] = []


//функция не имеет право менять state! сначала нужно создать копию
export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => { //должны всегда вернуть массив
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter(t => t.id !== action.id)
    }
    case "ADD-TODOLIST": {
      const newTodolist: TodolistDomainType = { ...action.todolist, filter: "all" } //todolist который приходит с сервера и добавила нужное мне расширение
      //положили старые листы в массив и добавили новый(объект)!
      return [newTodolist, ...state]
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map(t => t.id === action.id ? { ...t, title: action.title } : t)
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map(t => t.id === action.id ? { ...t, filter: action.filter } : t)
    }
    case "SET-TODOLIST": { //установка прилетеших из сервера тудулитсов с нужным нам дополнительным расширением filter
      return action.todolists.map(tl => {
        return {
          ...tl,
          filter: "all"
        }
      })
    }
    default:
      return state;
  }
}


//action creator
export const RemoveTodolistAC = (todolistId: string) => {
  return { type: 'REMOVE-TODOLIST', id: todolistId } as const
}

export const AddTodolistAC = (todolist: TodolistTypeApi) => {
  return {
    type: 'ADD-TODOLIST',
    todolist: todolist
  } as const
}

export const ChangeTitleTodolistAC = (title: string, id: string) => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    id: id,
    title: title
  } as const
}

export const ChangeFilterTodolistAC = (filter: FilterValuesType, id: string) => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    id: id,
    filter: filter
  } as const
}


export const SetTodolistAC = (todolists: TodolistTypeApi[]) => { //фиксирую прилетевшие с сервера todolists
  return {
    type: 'SET-TODOLIST',
    todolists: todolists
  } as const
}


export const fetchTodolistTC = (dispatch: Dispatch) => { //функц прослойка для dispatch api
  todolistsApi.getTodoslists()
    .then((res) => {
      dispatch(SetTodolistAC(res.data))
    })
}


export const removeTodolistTC = (todolistId: string) => { //функц прослойка для dispatch api
  return (dispatch: Dispatch) => {
    todolistsApi.deleteTodoslist(todolistId)
      .then((res) => {
        dispatch(RemoveTodolistAC(todolistId))
      })
  }
}


export const addTodolistTC = (title: string) => { //функц прослойка для dispatch api
  return (dispatch: Dispatch) => {
    todolistsApi.createTodoslist(title)
      .then((res) => {
        dispatch(AddTodolistAC(res.data.data.item))
      })
  }
}
import { v1 } from "uuid";
import { FilterValues, TodoListsType } from "../../App";


export type RemoveTodoList = {
  type: "REMOVE-TODOLIST",
  id: string
}

export type AddTodoList = {
  type: "ADD-TODOLIST",
  title: string
  todolistId: string
}

export type ChangeTitleTodoList = {
  type: "CHANGE-TODOLIST-TITLE",
  id: string
  title: string
}

export type ChangeFilterTodoList = {
  type: "CHANGE-TODOLIST-FILTER",
  id: string
  filter: FilterValues
}

type ActionsType =  //общий тип!
  RemoveTodoList
  | AddTodoList
  | ChangeTitleTodoList
  | ChangeFilterTodoList



//функция не имеет право менять state! сначала нужно создать копию
export const todolistsReducer = (state: TodoListsType[], action: ActionsType): TodoListsType[] => { //должны всегда вернуть массив
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter(t => t.id !== action.id)
    }
    case "ADD-TODOLIST": {
      //положили старые листы в массив и добавили новый(объект)!
      return [...state, {
        id: action.todolistId,
        title: action.title, //приходит из тестов с action
        filter: "all"
      }]
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map(t => t.id === action.id ? { ...t, title: action.title } : t)
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map(t => t.id === action.id ? { ...t, filter: action.filter } : t)
    }
    default:
      throw new Error('I don\'t understand this type')
  }
}


//action creator
export const removeTodolistAC = (todolistId: string): RemoveTodoList => {
  return { type: 'REMOVE-TODOLIST', id: todolistId }
}

export const addTodolistAC = (title: string): AddTodoList => {
  return {
    type: 'ADD-TODOLIST',
    title: title,
    todolistId: v1()
  }
}

export const changeTitleTodolistAC = (id: string, title: string,): ChangeTitleTodoList => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    id: id,
    title: title
  }
}

export const changeFilterTodolistAC = (id: string, filter: FilterValues,): ChangeFilterTodoList => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    id: id,
    filter: filter
  }
}

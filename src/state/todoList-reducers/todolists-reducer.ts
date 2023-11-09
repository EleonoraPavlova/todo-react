import { v1 } from "uuid";
import { TodolistTypeApi } from "../../api/todolists-api";

export type RemoveTodoList = ReturnType<typeof RemoveTodolistAC>

export type AddTodoList = ReturnType<typeof AddTodolistAC>

export type ChangeTitleTodoList = ReturnType<typeof ChangeTitleTodolistAC>

export type ChangeFilterTodoList = ReturnType<typeof ChangeFilterTodolistAC>


type ActionsType =  //общий тип!
  RemoveTodoList
  | AddTodoList
  | ChangeTitleTodoList
  | ChangeFilterTodoList

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
      //положили старые листы в массив и добавили новый(объект)!
      return [{
        id: action.todolistId,
        title: action.title, //приходит из тестов с action
        filter: "all",
        addedDate: "",
        order: 0
      }, ...state]
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map(t => t.id === action.id ? { ...t, title: action.title } : t)
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map(t => t.id === action.id ? { ...t, filter: action.filter } : t)
    }
    default:
      return state;
  }
}


//action creator
export const RemoveTodolistAC = (todolistId: string) => {
  return { type: 'REMOVE-TODOLIST', id: todolistId } as const
}

export const AddTodolistAC = (title: string) => {
  return {
    type: 'ADD-TODOLIST',
    title: title,
    todolistId: v1()
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


// const todolistSelector = (state: AppRootState) => state.todolist;

// export const getTodolistsSelector = createSelector(todolistSelector, todolists => Object.assign(todolists))
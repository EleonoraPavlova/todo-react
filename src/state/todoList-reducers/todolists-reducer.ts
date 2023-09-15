import { v1 } from "uuid";
import { FilterValues, TodoListsType } from "../../App";


export type RemoveTodoList = ReturnType<typeof removeTodolistAC>

export type AddTodoList = ReturnType<typeof addTodolistAC>

export type ChangeTitleTodoList = ReturnType<typeof changeTitleTodolistAC>

export type ChangeFilterTodoList = ReturnType<typeof changeFilterTodolistAC>


type ActionsType =  //общий тип!
  RemoveTodoList
  | AddTodoList
  | ChangeTitleTodoList
  | ChangeFilterTodoList


export let todoListId1 = v1()
export let todoListId2 = v1()

export const initialState: TodoListsType[] = [ //этот стейт для управления  map отрисовки TodoList
  { id: todoListId1, title: "What to learn", filter: "all" },
  { id: todoListId2, title: "What to buy", filter: "all" }
]

//функция не имеет право менять state! сначала нужно создать копию
export const todolistsReducer = (state: TodoListsType[] = initialState, action: ActionsType): TodoListsType[] => { //должны всегда вернуть массив
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter(t => t.id !== action.id)
    }
    case "ADD-TODOLIST": {
      //положили старые листы в массив и добавили новый(объект)!
      return [{
        id: action.todolistId,
        title: action.title, //приходит из тестов с action
        filter: "all"
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
    // throw new Error('I don\'t understand this type')
  }
}


//action creator
export const removeTodolistAC = (todolistId: string) => {
  return { type: 'REMOVE-TODOLIST', id: todolistId } as const
}

export const addTodolistAC = (title: string) => {
  return {
    type: 'ADD-TODOLIST',
    title: title,
    todolistId: v1()
  } as const
}

export const changeTitleTodolistAC = (title: string, id: string) => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    id: id,
    title: title
  } as const
}

export const changeFilterTodolistAC = (filter: FilterValues, id: string) => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    id: id,
    filter: filter
  } as const
}

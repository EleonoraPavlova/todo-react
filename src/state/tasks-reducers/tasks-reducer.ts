import { v1 } from "uuid";
import { TasksType } from "../../apps/App/App";
import { AddTodoList, RemoveTodoList } from "../todoList-reducers/todolists-reducer";
// import { AppRootState } from "../store";
// import { createSelector } from "reselect";


export type RemoveTask = {
  type: "REMOVE-TASK"
  id: string
  togoListId: string
}

export type AddTask = {
  type: "ADD-TASK"
  inputValue: string
  togoListId: string
}

export type ChangeTitleTask = {
  type: "CHANGE-TASK-TITLE"
  id: string
  input: string
  togoListId: string
}

export type ChangeStatusTask = {
  type: "CHANGE-TASK-STATUS"
  id: string
  togoListId: string
  isDone: boolean
}

type ActionsType =  //общий тип!
  RemoveTask
  | AddTask
  | ChangeTitleTask
  | ChangeStatusTask
  | AddTodoList
  | RemoveTodoList


export const initialStateTasks: TasksType = {
  count: []
}
// {
//   [todoListId1]: [ //id этот передала пропсами id={l.id}  в  TodoList
//     { id: v1(), title: "HTML&CSS", isDone: true },
//     { id: v1(), title: "JS", isDone: true },
//     { id: v1(), title: "ReactJS", isDone: false },
//     { id: v1(), title: "Redax", isDone: false }
//   ],
//   [todoListId2]: [
//     { id: v1(), title: "Milk", isDone: true },
//     { id: v1(), title: "Juice", isDone: true },
//     { id: v1(), title: "Meat", isDone: false },
//     { id: v1(), title: "Bread", isDone: false }
//   ]
// }

//функция не имеет право менять state! сначала нужно создать копию
export const tasksReducer = (state: TasksType = initialStateTasks, action: ActionsType): TasksType => { //должны всегда вернуть массив
  switch (action.type) {
    case "REMOVE-TASK": {
      let filteredTasks = state[action.togoListId].filter(t => t.id !== action.id)
      state[action.togoListId] = filteredTasks
      return { ...state }
    }

    case "ADD-TASK": {
      let newTask = { id: v1(), title: action.inputValue, isDone: false }
      return { ...state, [action.togoListId]: [newTask, ...state[action.togoListId]] }
    }

    case "CHANGE-TASK-TITLE": {
      return {
        ...state,
        [action.togoListId]: state[action.togoListId].map(t => t.id === action.id ? { ...t, title: action.input } : t)
      }
    }

    case "CHANGE-TASK-STATUS": {
      return {
        ...state,
        [action.togoListId]: state[action.togoListId].map(t => t.id === action.id ? { ...t, isDone: action.isDone } : t)
      }
    }
    case "ADD-TODOLIST": {
      //добавление общего todolista
      return { ...state, [action.todolistId]: [] }
    }
    case "REMOVE-TODOLIST": {
      const copyState = { ...state }
      delete copyState[action.id]
      return copyState
    }
    default:
      return state;
  }
}


//action creator
export const removeTaskAC = (id: string, togoListId: string): RemoveTask => {
  return { type: 'REMOVE-TASK', id: id, togoListId: togoListId }
}

export const addTaskAC = (inputValue: string, togoListId: string): AddTask => {
  return {
    type: 'ADD-TASK',
    inputValue: inputValue,
    togoListId: togoListId
  }
}

export const changeTaskTitleAC = (id: string, input: string, togoListId: string): ChangeTitleTask => {
  return {
    type: 'CHANGE-TASK-TITLE',
    id: id,
    input: input,
    togoListId: togoListId
  }
}


export const changeTaskStatusAC = (togoListId: string, id: string, isDone: boolean): ChangeStatusTask => {
  return {
    type: 'CHANGE-TASK-STATUS',
    id: id,
    togoListId: togoListId,
    isDone: isDone
  }
}


// const tasksSelector = (state: AppRootState) => state.tasks;

// export const getTasksSelector = createSelector(tasksSelector, tasks => Object.assign(tasks))
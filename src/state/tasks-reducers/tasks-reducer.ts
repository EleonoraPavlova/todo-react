import { v1 } from "uuid";
import { AddTodoList, RemoveTodoList } from "../todoList-reducers/todolists-reducer";
import { TaskPriorities, TaskStatuses, TasksObjType } from "../../api/tasks-api";

export type RemoveTask = ReturnType<typeof RemoveTaskAC>
export type AddTask = ReturnType<typeof AddTaskAC>
export type ChangeTitleTask = ReturnType<typeof ChangeTaskTitleAC>
export type ChangeStatusTask = ReturnType<typeof ChangeTaskStatusAC>


type ActionsType =  //общий тип!
  RemoveTask
  | AddTask
  | ChangeTitleTask
  | ChangeStatusTask
  | AddTodoList
  | RemoveTodoList


export const initialStateTasks: TasksObjType = {}
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
export const tasksReducer = (state: TasksObjType = initialStateTasks, action: ActionsType): TasksObjType => { //должны всегда вернуть массив
  switch (action.type) {
    case "REMOVE-TASK": {
      let filteredTasks = state[action.togoListId].filter(t => t.id !== action.id)
      state[action.togoListId] = filteredTasks
      return { ...state }
    }
    case "ADD-TASK": {
      let newTask = {
        id: v1(), title: action.inputValue, status: TaskStatuses.New,
        description: "Decs", completed: true,
        priority: TaskPriorities.Low, startDate: "",
        todoListId: action.togoListId, deadline: "", order: 1, addedDate: ""
      }
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
        [action.togoListId]: state[action.togoListId].map(t => t.id === action.id ? { ...t, status: action.status } : t)
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
export const RemoveTaskAC = (id: string, togoListId: string) => {
  return { type: 'REMOVE-TASK', id: id, togoListId: togoListId } as const
}

export const AddTaskAC = (inputValue: string, togoListId: string) => {
  return {
    type: 'ADD-TASK',
    inputValue: inputValue,
    togoListId: togoListId
  } as const
}

export const ChangeTaskTitleAC = (id: string, input: string, togoListId: string) => {
  return {
    type: 'CHANGE-TASK-TITLE',
    id: id,
    input: input,
    togoListId: togoListId
  } as const
}


export const ChangeTaskStatusAC = (togoListId: string, id: string, status: TaskStatuses) => {
  return {
    type: 'CHANGE-TASK-STATUS',
    id: id,
    togoListId: togoListId,
    status: status
  } as const
}


// const tasksSelector = (state: AppRootState) => state.tasks;
// export const getTasksSelector = createSelector(tasksSelector, tasks => Object.assign(tasks))
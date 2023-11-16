import { AddTodoList, RemoveTodoList, SetTodoList } from "../todoList-reducers/todolists-reducer";
import { TaskStatuses, TaskTypeApi, TasksObjType, tasksApi } from "../../api/tasks-api";
import { Dispatch } from "redux";


export type RemoveTask = ReturnType<typeof RemoveTaskAC>
export type AddTask = ReturnType<typeof AddTaskAC>
export type ChangeTitleTask = ReturnType<typeof ChangeTaskTitleAC>
export type ChangeStatusTask = ReturnType<typeof ChangeTaskStatusAC>
export type SetTasks = ReturnType<typeof SetTasksAC>


type ActionsType =  //общий тип!
  RemoveTask
  | AddTask
  | ChangeTitleTask
  | ChangeStatusTask
  | AddTodoList
  | RemoveTodoList
  | SetTodoList
  | SetTasks


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
      let filteredTasks = state[action.todoListId].filter(t => t.id !== action.taskId)
      state[action.todoListId] = filteredTasks
      return { ...state }
    }
    case "ADD-TASK": {
      let newTask = action.task
      return { ...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]] }
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
        [action.todoListId]: state[action.todoListId].map(t => t.id === action.id ? { ...t, status: action.status } : t)
      }
    }

    case "ADD-TODOLIST": {
      //добавление общего todolista
      return { ...state, [action.todolist.id]: [] }
    }

    case "REMOVE-TODOLIST": {
      const copyState = { ...state }
      delete copyState[action.id]
      return copyState
    }

    case "SET-TODOLIST": {
      const copyState = { ...state }
      action.todolists.map(tl => copyState[tl.id] = [])
      return copyState
    }

    case "SET-TASKS": {
      const copyState = { ...state }
      copyState[action.todoListId] = action.tasks // = action.tasks  переопределила массив тасок по конкр action.todolistId
      return copyState
    }

    default:
      return state;
  }
}


//action creator
export const RemoveTaskAC = (todoListId: string, taskId: string) => {
  return { type: 'REMOVE-TASK', todoListId: todoListId, taskId: taskId } as const
}

export const AddTaskAC = (task: TaskTypeApi) => {
  return {
    type: 'ADD-TASK',
    task: task
  } as const
}

export const ChangeTaskTitleAC = (id: string, input: string, todoListId: string) => {
  return {
    type: 'CHANGE-TASK-TITLE',
    id: id,
    input: input,
    togoListId: todoListId
  } as const
}


export const ChangeTaskStatusAC = (todoListId: string, id: string, status: TaskStatuses) => {
  return {
    type: 'CHANGE-TASK-STATUS',
    id: id,
    todoListId: todoListId,
    status: status
  } as const
}

export const SetTasksAC = (tasks: TaskTypeApi[], todoListId: string) => {
  return {
    type: 'SET-TASKS',
    tasks: tasks,
    todoListId: todoListId
  } as const
}


//функции санки  ВСЕ ЗАПРОСЫ НА СЕРВЕР ДЕЛАТЬ В САНКАХ ТОЛЬКО!
export const fetchTasksTC = (todolistId: string) => { //функц прослойка для dispatch api
  return (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistId)
      .then((res) => {
        dispatch(SetTasksAC(res.data.items, todolistId))
      })
  }
}

export const removeTaskTC = (todoListId: string, taskId: string) => {
  return (dispatch: Dispatch) => {
    tasksApi.deleteTasks(todoListId, taskId)
      .then((res) => {
        const action = RemoveTaskAC(todoListId, taskId)
        dispatch(action)
      })
  }
}

export const addTaskTC = (title: string, todoListId: string) => {
  return (dispatch: Dispatch) => {
    tasksApi.createTasks(title, todoListId)
      .then((res) => {
        const task = res.data.data.item
        const action = AddTaskAC(task)
        dispatch(action)
      })
  }
}
// const tasksSelector = (state: AppRootState) => state.tasks;
// export const getTasksSelector = createSelector(tasksSelector, tasks => Object.assign(tasks))
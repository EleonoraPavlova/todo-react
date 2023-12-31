//BLL
import { AddTodoList, RemoveTodoList, SetTodoList } from "../todoList-reducers/todolists-reducer";
import { TaskPriorities, TaskStatuses, TaskTypeApi, TasksObjType, UpdateTaskModel, tasksApi } from "../../api_DAL/tasks-api";
//import { Dispatch } from "redux"; //only from redux
import { AppRootState, AppThunkType } from "../storeBLL";
import { setAppStatusAC, setAppSuccessAC } from "../app-reducer/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils";

//type ActionsType = ReturnType<typeof getTodosAC> | ReturnType<typeof changeTodoStatusAC>

export type ActionsTasksType =
  ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof changeTaskTitleAC>
  | ReturnType<typeof changeTaskStatusAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof clearTasksAC>
  | SetTodoList
  | AddTodoList
  | RemoveTodoList


export enum ResultCode { //enum  ONLY for reading, cannot be overwritten!!
  SUCCEEDED = 0,
  ERROR = 1,
  ERROR_CAPTCHA = 10
}

export const initialStateTasks: TasksObjType = {
  "todoListId1": [
    {
      description: "",
      title: "",
      completed: false,
      status: TaskStatuses.New,
      priority: TaskPriorities.Low,
      startDate: "",
      deadline: "",
      id: "",
      todoListId: "",
      order: 0,
      addedDate: ""
    }
  ],
  "todoListId2": [
    {
      description: "",
      title: "",
      completed: false,
      status: TaskStatuses.New,
      priority: TaskPriorities.Low,
      startDate: "",
      deadline: "",
      id: "",
      todoListId: "",
      order: 0,
      addedDate: ""
    }
  ]
}

export const tasksReducer = (state: TasksObjType = initialStateTasks, action: ActionsTasksType): TasksObjType => {
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
        [action.todoListId]: state[action.todoListId].map(t => t.id === action.id ? { ...t, title: action.title } : t)
      }
    }

    case "CHANGE-TASK-STATUS": {
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map(t => t.id === action.id ? { ...t, status: action.status } : t)
      }
    }

    case "UPDATE-TASK": {
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map(t => t.id === action.id ? { ...t, ...action.payload } : t)
      }
    }

    case "ADD-TODOLIST": {
      //добавление общего todolista
      return { ...state, [action.todolist.id]: [] }
    }

    case "REMOVE-TODOLIST": {
      const copyState = { ...state }
      delete copyState[action.todolistId]
      return copyState
    }

    case "SET-TODOLIST": {//устанавливает пустой массив!
      const copyState = { ...state }
      delete copyState["todoListId1"];
      delete copyState["todoListId2"];
      action.todolists.map(tl => copyState[tl.id] = [])
      return copyState
    }

    case "SET-TASKS": {
      //: action.tasks  переопределила массив тасок по конкр action.todolistId
      return { ...state, [action.todoListId]: action.tasks }
    }

    case "CLEAR-TASKS": {
      return {}
    }

    default:
      return state;
  }
}


//action creator
export const removeTaskAC = (todoListId: string, taskId: string) => {
  return { type: 'REMOVE-TASK', todoListId, taskId } as const
}

export const addTaskAC = (task: TaskTypeApi) => {
  return { type: 'ADD-TASK', task } as const
}

export const changeTaskTitleAC = (id: string, title: string, todoListId: string) => { //можно удалить, есть updateTaskAC
  //который меняет любое поле
  return {
    type: 'CHANGE-TASK-TITLE', id, title, todoListId
  } as const
}

export const changeTaskStatusAC = (todoListId: string, id: string, status: TaskStatuses) => {
  return {
    type: 'CHANGE-TASK-STATUS', id, todoListId, status
  } as const
}

export const setTasksAC = (tasks: TaskTypeApi[], todoListId: string) => {
  return {
    type: 'SET-TASKS', tasks, todoListId
  } as const
}


export const updateTaskAC = (todoListId: string, id: string, payload: UpdateTaskModelForReducerFn) => {
  return {
    type: 'UPDATE-TASK',
    todoListId, id, payload
  } as const
}

export const clearTasksAC = () => {
  return { type: 'CLEAR-TASKS' } as const
}

//функции санки  ВСЕ ЗАПРОСЫ НА СЕРВЕР ДЕЛАТЬ В САНКАХ ТОЛЬКО!
export const getTasksTC = (todolistId: string): AppThunkType =>  //функц прослойка для dispatch api
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await tasksApi.getTasks(todolistId)
      dispatch(setTasksAC(res.data.items, todolistId))
      dispatch(setAppStatusAC('succeeded'))
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch) //обработка серверных ошибок
    }
  }


export const removeTaskTC = (todoListId: string, taskId: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTaskStatusAC(todoListId, taskId, TaskStatuses.InProgress))
    try {
      await tasksApi.deleteTasks(todoListId, taskId)
      dispatch(removeTaskAC(todoListId, taskId))
      dispatch(setAppSuccessAC("task was successful removed"))
      dispatch(setAppStatusAC('succeeded'))
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
    }
  }


export const addTaskTC = (title: string, todoListId: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await tasksApi.createTasks(title, todoListId)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        const task = res.data.data.item
        dispatch(addTaskAC(task))
        dispatch(setAppSuccessAC("task was successful added"))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data.messages, dispatch)
      }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
    }
  }


export const changeTaskTitleTC = (todoListId: string, id: string, title: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await tasksApi.updateTaskTitle(todoListId, id, title)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(changeTaskTitleAC(id, title, todoListId))
        dispatch(setAppSuccessAC("task title was successful changed"))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data.messages, dispatch)
      }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
    }
  }


export const changeTaskStatusTC = (todoListId: string, id: string, status: TaskStatuses): AppThunkType =>
  async (dispatch, getState: () => AppRootState) => {
    dispatch(setAppStatusAC('loading'))
    const task = getState().tasks[todoListId].find(t => t.id === id)   //вытянула rootReducer с тасками и нашла нужную
    if (task) {
      const payload: UpdateTaskModel = { //модель самой таски, которую пишем вручную чтобы знать конкретные поля для изменения
        //сервер присылает отсылает больше полей
        title: task.title,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        status: status
      }
      try {
        const res = await tasksApi.updateTaskAtAll(todoListId, id, payload)
        if (res.data.resultCode === ResultCode.SUCCEEDED) {
          dispatch(changeTaskStatusAC(todoListId, id, status))
          dispatch(setAppSuccessAC("task status was successful changed"))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerAppError(res.data.messages, dispatch)
        }
      } catch (err) {
        handleServerNetworkError(err as { message: string }, dispatch)
      }
    }
  }

export type UpdateTaskModelForReducerFn = { //какие поля можно обновить в tasks
  title?: string
  description?: string
  status?: number
  priority?: number
  startDate?: string
  deadline?: string
}

//вариант как объединить 2 функции
export const updateTaskTC = (todoListId: string, id: string, apiModal: UpdateTaskModelForReducerFn): AppThunkType =>
  async (dispatch, getState: () => AppRootState) => {
    const task = getState().tasks[todoListId].find(t => t.id === id)   //вытянула rootReducer с тасками и нашла нужную
    if (task) {
      const payload: UpdateTaskModel = { //модель самой таски, которую мы пишем вручную чтобы знать конкретные поля для изменения
        //сервер присылает отсылает больше полей
        title: task.title,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        status: task.status,
        ...apiModal
      }
      dispatch(setAppStatusAC('loading'))
      try {
        const res = await tasksApi.updateTaskAtAll(todoListId, id, payload)
        if (res.data.resultCode === ResultCode.SUCCEEDED) {
          dispatch(updateTaskAC(todoListId, id, payload))
          dispatch(setAppSuccessAC("task was successful updated"))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerAppError(res.data.messages, dispatch)
        }
      } catch (err) {
        handleServerNetworkError(err as { message: string }, dispatch)
      }
    }
  }
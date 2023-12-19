//BLL
import { AddTodoList, RemoveTodoList, SetTodoList } from "../todoList-reducers/todolists-reducer";
import { TaskStatuses, TaskTypeApi, TasksObjType, UpdateTaskModel, tasksApi } from "../../api_DAL/tasks-api";
import { Dispatch } from "redux";
import { AppRootState } from "../storeBLL";
import { setAppStatusAC, setAppSuccessAC } from "../app-reducer/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils";

//type ActionsType = ReturnType<typeof getTodosAC> | ReturnType<typeof changeTodoStatusAC>

type ActionsType =
  ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof changeTaskTitleAC>
  | ReturnType<typeof changeTaskStatusAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof updateTaskAC>
  | SetTodoList
  | AddTodoList
  | RemoveTodoList


export const initialStateTasks: TasksObjType = {}

export const tasksReducer = (state: TasksObjType = initialStateTasks, action: ActionsType): TasksObjType => {
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
      action.todolists.map(tl => copyState[tl.id] = [])
      return copyState
    }

    case "SET-TASKS": {
      //: action.tasks  переопределила массив тасок по конкр action.todolistId
      return { ...state, [action.todoListId]: action.tasks }
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


//функции санки  ВСЕ ЗАПРОСЫ НА СЕРВЕР ДЕЛАТЬ В САНКАХ ТОЛЬКО!
export const getTasksTC = (todolistId: string) => { //функц прослойка для dispatch api
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksApi.getTasks(todolistId)
      .then((res) => {
        dispatch(setTasksAC(res.data.items, todolistId))
        dispatch(setAppStatusAC('succeeded'))
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}

export const removeTaskTC = (todoListId: string, taskId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksApi.deleteTasks(todoListId, taskId)
      .then((res) => {
        dispatch(removeTaskAC(todoListId, taskId))
        dispatch(setAppSuccessAC("task was successful removed"))
        dispatch(setAppStatusAC('succeeded'))
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}

export const addTaskTC = (title: string, todoListId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksApi.createTasks(title, todoListId)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const task = res.data.data.item
          dispatch(addTaskAC(task))
          dispatch(setAppSuccessAC("task was successful added"))
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


export const changeTaskTitleTC = (todoListId: string, id: string, title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksApi.updateTaskTitle(todoListId, id, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(changeTaskTitleAC(id, title, todoListId))
          dispatch(setAppSuccessAC("task title was successful changed"))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerAppError(res.data.messages, dispatch)
        }
      }).catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}

export const changeTaskStatusTC = (todoListId: string, id: string, status: TaskStatuses) => {
  return (dispatch: Dispatch, getState: () => AppRootState) => {
    dispatch(setAppStatusAC('loading'))
    const task = getState().tasks[todoListId].find(t => t.id === id)   //вытянула rootReducer с тасками и нашла нужную
    if (task) {
      const payload: UpdateTaskModel = { //модель самой таски, которую мы пишем вручную чтобы знать конкретные поля для изменения
        //сервер присылает отсылает больше полей
        title: task.title,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        status: status
      }
      tasksApi.updateTaskAtAll(todoListId, id, payload)
        .then((res) => {
          if (res.data.resultCode === 0) {
            dispatch(changeTaskStatusAC(todoListId, id, status))
            dispatch(setAppSuccessAC("task status was successful changed"))
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
export const updateTaskTC = (todoListId: string, id: string, apiModal: UpdateTaskModelForReducerFn) => {
  return (dispatch: Dispatch, getState: () => AppRootState) => {
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
      tasksApi.updateTaskAtAll(todoListId, id, payload)
        .then((res) => {
          if (res.data.resultCode === 0) {
            dispatch(updateTaskAC(todoListId, id, payload))
            dispatch(setAppSuccessAC("task was successful updated"))
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
}
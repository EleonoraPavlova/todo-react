//BLL
import { AddTodoList, RemoveTodoList, SetTodoList } from "../todoList-reducers/todolists-reducer";
import { TaskStatuses, TaskTypeApi, TasksObjType, UpdateTaskModel, tasksApi } from "../../api_DAL/tasks-api";
import { Dispatch } from "redux";
import { AppRootState } from "../storeBLL";
import { SetErrorType, SetStatusType, setErrorAC, setStatusAC } from "../app-reducer/app-reducer";

//type ActionsType = ReturnType<typeof getTodosAC> | ReturnType<typeof changeTodoStatusAC>

type ActionsType =
  ReturnType<typeof RemoveTaskAC>
  | ReturnType<typeof AddTaskAC>
  | ReturnType<typeof ChangeTaskTitleAC>
  | ReturnType<typeof ChangeTaskStatusAC>
  | ReturnType<typeof SetTasksAC>
  | ReturnType<typeof UpdateTaskAC>
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

    case "SET-TODOLIST": {
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
export const RemoveTaskAC = (todoListId: string, taskId: string) => {
  return { type: 'REMOVE-TASK', todoListId, taskId } as const
}

export const AddTaskAC = (task: TaskTypeApi) => {
  return { type: 'ADD-TASK', task } as const
}

export const ChangeTaskTitleAC = (id: string, title: string, todoListId: string) => { //можно удалить, есть UpdateTaskAC
  //который меняет любое поле
  return {
    type: 'CHANGE-TASK-TITLE', id, title, todoListId
  } as const
}

export const ChangeTaskStatusAC = (todoListId: string, id: string, status: TaskStatuses) => {
  return {
    type: 'CHANGE-TASK-STATUS', id, todoListId, status
  } as const
}

export const SetTasksAC = (tasks: TaskTypeApi[], todoListId: string) => {
  return {
    type: 'SET-TASKS', tasks, todoListId
  } as const
}


export const UpdateTaskAC = (todoListId: string, id: string, payload: UpdateTaskModelForReducerFn) => {
  return {
    type: 'UPDATE-TASK',
    todoListId, id, payload
  } as const
}


//функции санки  ВСЕ ЗАПРОСЫ НА СЕРВЕР ДЕЛАТЬ В САНКАХ ТОЛЬКО!
export const getTasksTC = (todolistId: string) => { //функц прослойка для dispatch api
  return (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    tasksApi.getTasks(todolistId)
      .then((res) => {
        dispatch(SetTasksAC(res.data.items, todolistId))
        dispatch(setStatusAC('succeeded'))
      })
  }
}

export const removeTaskTC = (todoListId: string, taskId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    tasksApi.deleteTasks(todoListId, taskId)
      .then((res) => {
        dispatch(RemoveTaskAC(todoListId, taskId))
        dispatch(setStatusAC('succeeded'))
      })
  }
}

export const addTaskTC = (title: string, todoListId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    tasksApi.createTasks(title, todoListId)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const task = res.data.data.item
          dispatch(AddTaskAC(task))
        } else {
          if (res.data.messages.length) {
            dispatch(setErrorAC(res.data.messages[0])) //приходит текст ошибки из сервера
          } else {
            dispatch(setErrorAC("Some error occurred"))//если не пришла из сервера, пишу вручную
          }
        }
        dispatch(setStatusAC('failed'))
      })
  }
}


export const changeTaskTitleTC = (todoListId: string, id: string, title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    tasksApi.updateTaskTitle(todoListId, id, title)
      .then((res) => {
        dispatch(ChangeTaskTitleAC(id, title, todoListId))
        dispatch(setStatusAC('succeeded'))
      })
  }
}

export const changeTaskStatusTC = (todoListId: string, id: string, status: TaskStatuses) => {
  return (dispatch: Dispatch, getState: () => AppRootState) => {
    dispatch(setStatusAC('loading'))
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
          dispatch(ChangeTaskStatusAC(todoListId, id, status))
          dispatch(setStatusAC('succeeded'))
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
      dispatch(setStatusAC('loading'))
      tasksApi.updateTaskAtAll(todoListId, id, payload)
        .then((res) => {
          dispatch(UpdateTaskAC(todoListId, id, payload))
          dispatch(setStatusAC('succeeded'))
        })
    }
  }
}
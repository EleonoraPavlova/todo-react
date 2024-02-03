//BLL
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TaskPriorities, TaskStatuses, TaskTypeApi, TasksObjType, UpdateTaskModel, tasksApi } from "../../api_DAL/tasks-api";
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils";
import { setAppStatusAC, setAppSuccessAC } from "../app-reducer/app-reducer";
import { AppRootState, AppThunkType } from "../storeBLL";
import { addTodolistAC, removeTodolistAC, setTodolistAC } from "../todoList-reducers/todolists-reducer";


export enum ResultCode { //enum  ONLY for reading, cannot be overwritten!!
  SUCCEEDED = 0,
  ERROR = 1,
  ERROR_CAPTCHA = 10
}

export const initialStateTasks: TasksObjType = {
  "todolistId1": [
    {
      description: "",
      title: "",
      completed: false,
      status: TaskStatuses.New,
      priority: TaskPriorities.Low,
      startDate: "",
      deadline: "",
      id: "",
      todolistId: "",
      order: 0,
      addedDate: ""
    }
  ],
  "todolistId2": [
    {
      description: "",
      title: "",
      completed: false,
      status: TaskStatuses.New,
      priority: TaskPriorities.Low,
      startDate: "",
      deadline: "",
      id: "",
      todolistId: "",
      order: 0,
      addedDate: ""
    }
  ]
}

// | clearTodoListAction
// | getTodoListAction

//Thunk always return promise! ALWAYS!
export const getTasksTC = createAsyncThunk("tasks/getTasks", async (todolistId: string, thunkApi) => {
  thunkApi.dispatch(setAppStatusAC({ status: 'loading' }))
  try {
    const res = await tasksApi.getTasks(todolistId)
    const tasks = res.data.items
    // thunkApi.dispatch(setTasksAC({ tasks, todolistId }))
    thunkApi.dispatch(setAppStatusAC({ status: 'succeeded' }))
    return { tasks, todolistId }
  } catch (err) {
    handleServerNetworkError(err as { message: string }, thunkApi.dispatch) //обработка серверных ошибок
  }
})

export const removeTaskTC = createAsyncThunk("tasks/removeTask", async (
  param: { todolistId: string, taskId: string }, thunkApi
) => {
  let { todolistId, taskId } = param
  thunkApi.dispatch(setAppStatusAC({ status: 'loading' }))
  thunkApi.dispatch(changeTaskStatusAC({ todolistId, id: taskId, status: TaskStatuses.InProgress }))
  try {
    await tasksApi.deleteTask(todolistId, taskId)
    // thunkApi.dispatch(removeTaskAC({ todolistId, taskId }))
    thunkApi.dispatch(setAppSuccessAC({ success: "task was successful removed" }))
    thunkApi.dispatch(setAppStatusAC({ status: 'succeeded' }))
    return { todolistId, taskId }
  } catch (err) {
    handleServerNetworkError(err as { message: string }, thunkApi.dispatch) //обработка серверных ошибок
  }
})

export const getTasksTC_ = (todolistId: string): AppThunkType =>  //функц прослойка для dispatch api
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await tasksApi.getTasks(todolistId)
      // dispatch(setTasksAC({ tasks: res.data.items, todolistId: todolistId }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch) //обработка серверных ошибок
    }
  }

export const removeTaskTC_ = (todolistId: string, taskId: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    dispatch(changeTaskStatusAC({ todolistId, id: taskId, status: TaskStatuses.InProgress }))
    try {
      await tasksApi.deleteTask(todolistId, taskId)
      // dispatch(removeTaskAC({ todolistId, taskId }))
      dispatch(setAppSuccessAC({ success: "task was successful removed" }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
    }
  }

const slice = createSlice({
  name: "tasks",
  initialState: initialStateTasks,
  reducers: {
    // removeTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string }>) {
    //   const tasks = state[action.payload.todolistId] // find a new arr
    //   const index = tasks.findIndex(t => t.id === action.payload.taskId)
    //   if (index > -1) tasks.splice(index, 1)
    // },
    addTaskAC(state, action: PayloadAction<{ task: TaskTypeApi }>) {
      state[action.payload.task.todolistId].unshift(action.payload.task)
    },
    // setTasksAC(state, action: PayloadAction<{ tasks: TaskTypeApi[], todolistId: string }>) {
    //   state[action.payload.todolistId] = action.payload.tasks
    // },
    updateTaskAC(state, action: PayloadAction<{ todolistId: string, id: string, model: UpdateTaskModelForReducerFn }>) {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(t => t.id === action.payload.id)
      if (index > -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model }
      }
    },
    changeTaskTitleAC(state, action: PayloadAction<{ id: string, title: string, todolistId: string }>) {//
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(t => t.id === action.payload.id)
      if (index > -1) {
        tasks[index] = { ...tasks[index], title: action.payload.title }
      }
    },
    changeTaskStatusAC(state, action: PayloadAction<{ todolistId: string, id: string, status: TaskStatuses }>) {//
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(t => t.id === action.payload.id)
      if (index > -1) {
        tasks[index] = { ...tasks[index], status: action.payload.status }
      }
    },
    clearTasksAC(state, action) {
      return {}
    },
  },
  extraReducers: (builder) => { //для обработки чужих редьюсеров
    builder
      .addCase(addTodolistAC, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(removeTodolistAC, (state, action) => {
        delete state[action.payload.todolistId];
      })
      .addCase(setTodolistAC, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = [];
        })
      })
      .addCase(getTasksTC.fulfilled, (state, action) => {//поведение редьюсера при успешном завершении
        // state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(removeTaskTC.fulfilled, (state, action) => {//поведение редьюсера при успешном завершении
        // const tasks = state[action.payload.todolistId]
        // const index = tasks.findIndex(t => t.id === action.payload.taskId)
        // if (index > -1) tasks.splice(index, 1)
      })
  }
})


export const tasksReducer = slice.reducer
export const {
  addTaskAC, changeTaskTitleAC, changeTaskStatusAC,
  updateTaskAC, clearTasksAC
} = slice.actions


//функции санки  ВСЕ ЗАПРОСЫ НА СЕРВЕР ДЕЛАТЬ В САНКАХ ТОЛЬКО!
export const addTaskTC = (title: string, todolistId: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await tasksApi.createTasks(title, todolistId)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        const task = res.data.data.item
        dispatch(addTaskAC({ task }))
        dispatch(setAppSuccessAC({ success: "task was successful added" }))
        dispatch(setAppStatusAC({ status: 'succeeded' }))
      } else {
        handleServerAppError(res.data.messages, dispatch)
      }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
    }
  }


export const changeTaskTitleTC = (todolistId: string, id: string, title: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await tasksApi.updateTaskTitle(todolistId, id, title)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(changeTaskTitleAC({ id, title, todolistId }))
        dispatch(setAppSuccessAC({ success: "task title was successful changed" }))
        dispatch(setAppStatusAC({ status: 'succeeded' }))
      } else {
        handleServerAppError(res.data.messages, dispatch)
      }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
    }
  }


export const changeTaskStatusTC = (todolistId: string, id: string, status: TaskStatuses): AppThunkType =>
  async (dispatch, getState: () => AppRootState) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    const task = getState().tasks[todolistId].find(t => t.id === id)   //вытянула rootReducer с тасками и нашла нужную
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
        const res = await tasksApi.updateTaskAtAll(todolistId, id, payload)
        if (res.data.resultCode === ResultCode.SUCCEEDED) {
          dispatch(changeTaskStatusAC({ todolistId, id, status }))
          dispatch(setAppSuccessAC({ success: "task status was successful changed" }))
          dispatch(setAppStatusAC({ status: 'succeeded' }))
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
export const updateTaskTC = (todolistId: string, id: string, apiModal: UpdateTaskModelForReducerFn): AppThunkType =>
  async (dispatch, getState: () => AppRootState) => {
    const task = getState().tasks[todolistId].find(t => t.id === id)   //вытянула rootReducer с тасками и нашла нужную
    if (task) {
      const model: UpdateTaskModel = { //модель самой таски, которую мы пишем вручную чтобы знать конкретные поля для изменения
        //сервер присылает отсылает больше полей
        title: task.title,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        status: task.status,
        ...apiModal
      }
      dispatch(setAppStatusAC({ status: 'loading' }))
      try {
        const res = await tasksApi.updateTaskAtAll(todolistId, id, model)
        if (res.data.resultCode === ResultCode.SUCCEEDED) {
          dispatch(updateTaskAC({ todolistId, id, model }))
          dispatch(setAppSuccessAC({ success: "task was successful updated" }))
          dispatch(setAppStatusAC({ status: 'succeeded' }))
        } else {
          handleServerAppError(res.data.messages, dispatch)
        }
      } catch (err) {
        handleServerNetworkError(err as { message: string }, dispatch)
      }
    }
  }
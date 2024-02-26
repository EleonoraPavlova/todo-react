//BLL
import { PayloadAction, createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { TaskPriorities, TaskStatuses, TasksObjType, UpdateTaskModel, tasksApi } from "../../api_DAL/tasks-api";
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils";
import { setAppStatusAC, setAppSuccessAC } from "../app-reducer/app-reducer";
import { AppRootState, AppThunkType } from "../storeBLL";
import { addTodolistTC, getTodolistTC, removeTodolistTC } from "../todoList-reducers/todolists-reducer";
import { AxiosError } from "axios";
import { ClearTasksTodolistsType, clearTasksTodolists } from "actions/actions";


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

export type UpdateTaskModelForReducerFn = { //какие поля можно обновить в tasks
  title?: string
  description?: string
  status?: number
  priority?: number
  startDate?: string
  deadline?: string
}

//Thunk always return promise! ALWAYS!
export const getTasksTC = createAsyncThunk("tasks/getTasks", async (todoListId: string, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC({ status: 'loading' }))
  try {
    const res = await tasksApi.getTasks(todoListId)
    const tasks = res.data.items
    //thunkApi.dispatch(setTasksAC({ tasks, todoListId })) extraReducers
    dispatch(setAppStatusAC({ status: 'succeeded' }))
    return { tasks, todoListId }
  } catch (err: unknown) {
    const error: AxiosError = err as AxiosError;
    handleServerNetworkError(err as { message: string }, dispatch)
    return rejectWithValue({
      errors: [error.message], fieldsErrors: undefined
    })
  }
})

export const removeTaskTC = createAsyncThunk("tasks/removeTask", async (
  param: { todoListId: string, taskId: string }, { dispatch, rejectWithValue }
) => {
  let { todoListId, taskId } = param
  dispatch(setAppStatusAC({ status: 'loading' }))
  dispatch(changeTaskStatusAC({ todoListId, id: taskId, status: TaskStatuses.InProgress }))
  try {
    await tasksApi.deleteTask(todoListId, taskId)
    // thunkApi.dispatch(removeTaskAC({ todoListId, taskId }))
    dispatch(setAppSuccessAC({ success: "task was successful removed" }))
    dispatch(setAppStatusAC({ status: 'succeeded' }))
    return { todoListId, taskId }
  } catch (err: unknown) {
    const error: AxiosError = err as AxiosError;
    handleServerNetworkError(err as { message: string }, dispatch)
    return rejectWithValue({
      errors: [error.message], fieldsErrors: undefined
    })
  }
})


export const addTaskTC = createAsyncThunk("tasks/addTask", async (
  param: { title: string, todoListId: string }, { dispatch, rejectWithValue }
) => {
  let { title, todoListId } = param;
  dispatch(setAppStatusAC({ status: 'loading' }))
  try {
    const res = await tasksApi.createTasks(title, todoListId)
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      const task = res.data.data.item
      // dispatch(addTaskAC({ task }))
      dispatch(setAppSuccessAC({ success: "task was successful added" }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
      return { task }
    } else {
      handleServerAppError(res.data.messages, dispatch)
      return rejectWithValue({ errors: res.data.messages, fieldsErrors: res.data.fieldsErrors })
    }
  } catch (err: unknown) {
    const error: AxiosError = err as AxiosError;
    handleServerNetworkError(err as { message: string }, dispatch)
    return rejectWithValue({
      errors: [error.message], fieldsErrors: undefined
    })
  }
})


export const updateTaskTC = createAsyncThunk("tasks/updateTask", async (
  param: { todoListId: string, id: string, apiModal: UpdateTaskModelForReducerFn }, { dispatch, rejectWithValue, getState }
) => {
  const state = getState() as AppRootState
  const task = state.tasks[param.todoListId].find(t => t.id === param.id)   //вытянула rootReducer с тасками и нашла нужную
  if (task) {
    const model: UpdateTaskModel = { //модель самой таски, которую мы пишем вручную чтобы знать конкретные поля для изменения
      //сервер присылает отсылает больше полей
      title: task.title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: task.status,
      ...param.apiModal
    }
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await tasksApi.updateTaskAtAll(param.todoListId, param.id, model)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        // dispatch(updateTaskAC({ todoListId, id, model }))
        dispatch(setAppSuccessAC({ success: "task was successful updated" }))
        dispatch(setAppStatusAC({ status: 'succeeded' }))
        return param  //возвращает updateTaskAC action creator
      } else {
        handleServerAppError(res.data.messages, dispatch)
        return rejectWithValue({ errors: res.data.messages, fieldsErrors: res.data.fieldsErrors })
      }
    } catch (err: unknown) {
      const error: AxiosError = err as AxiosError;
      handleServerNetworkError(err as { message: string }, dispatch)
      return rejectWithValue({
        errors: [error.message], fieldsErrors: undefined
      })
    }
  }
})

const slice = createSlice({
  name: "tasks",
  initialState: initialStateTasks,
  reducers: {
    // removeTaskAC(state, action: PayloadAction<{ todoListId: string, taskId: string }>) {
    //   const tasks = state[action.payload.todoListId] // find a new arr
    //   const index = tasks.findIndex(t => t.id === action.payload.taskId)
    //   if (index > -1) tasks.splice(index, 1)
    // },
    // addTaskAC(state, action: PayloadAction<{ task: TaskTypeApi }>) {
    //   state[action.payload.task.todoListId].unshift(action.payload.task)
    // },
    // setTasksAC(state, action: PayloadAction<{ tasks: TaskTypeApi[], todoListId: string }>) {
    //   state[action.payload.todoListId] = action.payload.tasks
    // },
    // updateTaskAC(state, action: PayloadAction<{ todoListId: string, id: string, model: UpdateTaskModelForReducerFn }>) {
    //   const tasks = state[action.payload.todoListId]
    //   const index = tasks.findIndex(t => t.id === action.payload.id)
    //   if (index > -1) {
    //     tasks[index] = { ...tasks[index], ...action.payload.model }
    //   }
    // },
    changeTaskTitleAC(state, action: PayloadAction<{ id: string, title: string, todoListId: string }>) {//
      const tasks = state[action.payload.todoListId]
      const index = tasks.findIndex(t => t.id === action.payload.id)
      if (index > -1) {
        tasks[index] = { ...tasks[index], title: action.payload.title }
      }
    },
    changeTaskStatusAC(state, action: PayloadAction<{ todoListId: string, id: string, status: TaskStatuses }>) {//
      const tasks = state[action.payload.todoListId]
      const index = tasks.findIndex(t => t.id === action.payload.id)
      if (index > -1) {
        tasks[index] = { ...tasks[index], status: action.payload.status }
      }
    }
  },
  extraReducers: (builder) => { //для обработки чужих редьюсеров
    builder
      .addCase(addTodolistTC.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(removeTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.todoListId];
      })
      .addCase(getTodolistTC.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = [];
        })
      })
      .addCase(addTaskTC.fulfilled, (state, action) => {//поведение редьюсера при успешном завершении
        state[action.payload.task.todoListId]?.unshift(action.payload.task)
      })
      .addCase(getTasksTC.fulfilled, (state, action) => {//поведение редьюсера при успешном завершении
        state[action.payload.todoListId] = action.payload.tasks
      })
      .addCase(removeTaskTC.fulfilled, (state, action) => {//поведение редьюсера при успешном завершении
        const tasks = state[action.payload.todoListId]
        const index = tasks.findIndex(t => t.id === action.payload?.taskId)
        if (index > -1) tasks.splice(index, 1)
      })
      .addCase(updateTaskTC.fulfilled, (state, action) => {//поведение редьюсера при успешном завершении
        if (action.payload) {
          const tasks = state[action.payload.todoListId]
          const index = tasks.findIndex(t => t.id === action.payload?.id)
          if (index > -1) tasks[index] = { ...tasks[index], ...action.payload.apiModal }
        }
      })
      .addCase(clearTasksTodolists, (state, action) => {
        console.log("state/tasks", current(state))
        return action.payload.tasks
      })
  }
})


export const tasksReducer = slice.reducer
export const { changeTaskTitleAC, changeTaskStatusAC } = slice.actions


export const changeTaskTitleTC = (todoListId: string, id: string, title: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await tasksApi.updateTaskTitle(todoListId, id, title)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(changeTaskTitleAC({ id, title, todoListId }))
        dispatch(setAppSuccessAC({ success: "task title was successful changed" }))
        dispatch(setAppStatusAC({ status: 'succeeded' }))
      } else {
        handleServerAppError(res.data.messages, dispatch)
      }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
    }
  }


export const changeTaskStatusTC = (todoListId: string, id: string, status: TaskStatuses): AppThunkType =>
  async (dispatch, getState: () => AppRootState) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
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
          dispatch(changeTaskStatusAC({ todoListId, id, status }))
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
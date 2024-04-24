//BLL
import { PayloadAction, createSlice, current } from '@reduxjs/toolkit'
import { clearTasksTodolists } from 'BLL/actions/actions'
import { setAppErrorAC, setAppStatusAC, setAppSuccessAC } from '../appSlice'
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk'
import { handleServerAppError } from 'common/utils/handleServerAppError'
import { AddTaskParams, DeleteTaskParams, Task, Tasks, UpdateTaskModel, UpdateTaskParams } from 'common/types'
import { ResultCode, TaskPriorities, TaskStatuses } from 'common/enums'
import { tasksApi } from 'api_DAL/tasks-api'
import { handleServerNetworkError, thunkTryCatch } from 'common/utils'
import { todolistsThunks } from '../todolistsSlice'
import { AppRootState } from 'BLL/store'

const initialStateTasks: Tasks = {
  todoListId1: [
    {
      description: '',
      title: '',
      completed: false,
      status: TaskStatuses.New,
      priority: TaskPriorities.Low,
      startDate: '',
      deadline: '',
      id: '',
      todoListId: '',
      order: 0,
      addedDate: '',
    },
  ],
  todoListId2: [
    {
      description: '',
      title: '',
      completed: false,
      status: TaskStatuses.New,
      priority: TaskPriorities.Low,
      startDate: '',
      deadline: '',
      id: '',
      todoListId: '',
      order: 0,
      addedDate: '',
    },
  ],
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialStateTasks,
  reducers: {
    removeTaskAC: {
      reducer: (state, action: PayloadAction<{ todoListId: string; taskId: string }>) => {
        const tasks = state[action.payload.todoListId] // find a new arr
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index > -1) tasks.splice(index, 1)
      },
      prepare: (todoListId: string, taskId: string) => {
        //подготов расчеты actions
        //ДО редьюсера выполняется
        return {
          payload: {
            todoListId,
            taskId,
          },
        }
      },
    },
    changeTaskTitleAC(state, action: PayloadAction<{ id: string; title: string; todoListId: string }>) {
      const tasks = state[action.payload.todoListId]
      const index = tasks.findIndex((t) => t.id === action.payload.id)
      if (index > -1) {
        tasks[index] = { ...tasks[index], title: action.payload.title }
      }
    },
    changeTaskStatusAC(state, action: PayloadAction<{ todoListId: string; id: string; status: TaskStatuses }>) {
      const tasks = state[action.payload.todoListId]
      const index = tasks.findIndex((t) => t.id === action.payload.id)
      if (index > -1) {
        tasks[index] = { ...tasks[index], status: action.payload.status }
      }
    },
  },
  extraReducers: (builder) => {
    //для обработки чужих редьюсеров и все по сути crud операции
    builder
      .addCase(todolistsThunks.addTodolistTC.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistsThunks.removeTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.todoListId]
      })
      .addCase(todolistsThunks.getTodolistTC.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = []
        })
      })
      .addCase(getTasksTC.fulfilled, (state, action) => {
        state[action.payload.todoListId] = action.payload.tasks
      })
      .addCase(addTaskTC.fulfilled, (state, action) => {
        state[action.payload.task.todoListId].unshift(action.payload.task)
      })
      .addCase(removeTaskTC.fulfilled, (state, action) => {
        const tasks = state[action.payload.todoListId]
        const index = tasks.findIndex((t) => t.id === action.payload?.taskId)
        if (index > -1) tasks.splice(index, 1)
      })
      .addCase(updateTaskTC.fulfilled, (state, action) => {
        if (action.payload) {
          const tasks = state[action.payload.todoListId]
          const index = tasks.findIndex((t) => t.id === action.payload?.taskId)
          if (index > -1) tasks[index] = { ...tasks[index], ...action.payload.domainModel }
        }
      })
      .addCase(clearTasksTodolists, (state, action) => {
        console.log('state/tasks', current(state))
        return {}
      })
  },
  selectors: {
    tasksSelector: (slice) => slice,
  },
})

//Thunk always return promise! ALWAYS!
const getTasksTC = createAppAsyncThunk<{ tasks: Task[]; todoListId: string }, string>(
  `${tasksSlice.name}/getTasks`,
  async (todoListId: string, thunkAPI) => {
    const { dispatch } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await tasksApi.getTasks(todoListId)
      const tasks = res.data.items
      //thunkApi.dispatch(setTasksAC({ tasks, todoListId })) extraReducers
      dispatch(setAppStatusAC({ status: 'succeeded' }))
      return { tasks, todoListId }
    })
  }
)

const removeTaskTC = createAppAsyncThunk<DeleteTaskParams, DeleteTaskParams>(
  `${tasksSlice.name}/removeTask`,
  async (params, thunkAPI) => {
    let { todoListId, taskId } = params
    const { dispatch } = thunkAPI
    dispatch(changeTaskStatusAC({ todoListId, id: taskId, status: TaskStatuses.InProgress }))
    return thunkTryCatch(thunkAPI, async () => {
      await tasksApi.deleteTask(params)
      // thunkApi.dispatch(removeTaskAC({ todoListId, taskId }))
      dispatch(setAppSuccessAC({ success: 'task was successful removed' }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
      return { todoListId, taskId }
    })
  }
)

const addTaskTC = createAppAsyncThunk<{ task: Task }, AddTaskParams>(
  `${tasksSlice.name}/addTask`,
  async (params, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await tasksApi.createTask(params)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        const task = res.data.data.item
        // dispatch(addTaskAC({ task }))
        dispatch(setAppSuccessAC({ success: 'task was successful added' }))
        dispatch(setAppStatusAC({ status: 'succeeded' }))
        return { task }
      } else {
        handleServerAppError(res.data.messages, dispatch)
        return rejectWithValue(null)
      }
    })
  }
)

const updateTaskTC = createAppAsyncThunk<UpdateTaskParams, UpdateTaskParams>(
  `${tasksSlice.name}/updateTask`,
  async (params, thunkAPI) => {
    const { todoListId, taskId, domainModel } = params
    const { dispatch, rejectWithValue, getState } = thunkAPI
    let state = getState() as AppRootState
    const task = state.tasks[todoListId].find((t: Task) => t.id === taskId) //вытянула rootReducer с тасками и нашла нужную
    if (!task) {
      dispatch(setAppErrorAC({ error: 'task was not found' }))
      return rejectWithValue(null)
    }
    const model: UpdateTaskModel = {
      //модель самой таски, которую мы пишем вручную чтобы знать конкретные поля для изменения
      //сервер присылает отсылает больше полей
      title: task.title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: task.status,
      ...domainModel,
    }

    dispatch(changeTaskStatusAC({ todoListId, id: taskId, status: TaskStatuses.InProgress }))
    return thunkTryCatch(thunkAPI, async () => {
      const res = await tasksApi.updateTaskAtAll({ todoListId, taskId, domainModel: model })
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        // dispatch(updateTaskAC({ todoListId, id, model }))
        dispatch(setAppSuccessAC({ success: 'task was successful updated' }))
        dispatch(setAppStatusAC({ status: 'succeeded' }))
        dispatch(changeTaskStatusAC({ todoListId, id: taskId, status: TaskStatuses.New }))
        return params //возвращает updateTaskAC action creator
      } else {
        handleServerAppError(res.data.messages, dispatch)
        return rejectWithValue(null)
      }
    })
  }
)

export const tasksReducer = tasksSlice.reducer
export const tasksThunks = { getTasksTC, addTaskTC, removeTaskTC, updateTaskTC }
export const { changeTaskTitleAC, changeTaskStatusAC } = tasksSlice.actions
export const { tasksSelector } = tasksSlice.selectors

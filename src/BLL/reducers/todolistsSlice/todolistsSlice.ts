//BLL
import { createAppAsyncThunk, handleServerAppError, thunkTryCatch } from 'common/utils'
import { PayloadAction, createSlice, current } from '@reduxjs/toolkit'
import { clearTasksTodolists } from 'BLL/actions/actions'
import { setAppSuccessAC } from '../appSlice'
import { FilterValues, RequestStatus, Todolist, TodolistDomain } from 'common/types'
import { ResultCode } from 'common/enums'
import { todolistsApi } from 'api/todolists-api'

type ParamUpdateTodolist = {
  todoListId: string
  title: string
  filter: FilterValues
}

const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: {
    todolists: [] as TodolistDomain[],
  },
  reducers: {
    changeStatusTodolistAC(state, action: PayloadAction<{ entityStatus: RequestStatus; todoListId: string }>) {
      const index = state.todolists.findIndex((t) => t.id === action.payload.todoListId)
      if (index > -1) state.todolists[index].entityStatus = action.payload.entityStatus
    },
  },
  extraReducers: (builder) => {
    //для обработки чужих редьюсеров
    builder
      .addCase(getTodolistTC.fulfilled, (state, action) => {
        return action.payload.todolists.forEach((tl) => {
          state.todolists.push({
            ...tl,
            filter: 'all',
            entityStatus: 'idle',
          })
        })
      })
      .addCase(removeTodolistTC.fulfilled, (state, action) => {
        const index = state.todolists.findIndex((t) => t.id === action.payload.todoListId)
        if (index > -1) state.todolists.splice(index, 1)
      })
      .addCase(addTodolistTC.fulfilled, (state, action) => {
        state.todolists.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
      })
      .addCase(updateTodolistTC.fulfilled, (state, action) => {
        const index = state.todolists.findIndex((t) => t.id === action.payload.todoListId)
        if (index > -1) state.todolists[index] = { ...state.todolists[index], ...action.payload }
      })
      .addCase(clearTasksTodolists, (state, action) => {
        console.log('state/todolists', current(state))
        return { todolists: [] }
      })
  },
  selectors: {
    selectTodolists: (state) => state.todolists,
  },
})

//thunk
const getTodolistTC = createAppAsyncThunk<{ todolists: Todolist[] }>(
  `${todolistsSlice.name}/getTodolist`,
  async (params, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await todolistsApi.getTodoslists()
      // dispatch(setTodolistAC({ todolists: res.data })) //уходит в return
      return { todolists: res.data }
    })
  }
)

const removeTodolistTC = createAppAsyncThunk<{ todoListId: string }, string>(
  `${todolistsSlice.name}/removeTodolist`,
  async (todoListId, thunkAPI) => {
    const { dispatch } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      dispatch(changeStatusTodolistAC({ entityStatus: 'loading', todoListId }))
      await todolistsApi.deleteTodoslist(todoListId)
      // dispatch(removeTodolistAC({ todoListId: todoListId }))
      dispatch(setAppSuccessAC({ success: 'todolist was successful removed' }))
      return { todoListId }
    })
  }
)

const addTodolistTC = createAppAsyncThunk<{ todolist: Todolist }, string>(
  `${todolistsSlice.name}/addNewTodolist`,
  async (title: string, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await todolistsApi.createTodoslist(title)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        // dispatch(addTodolistAC({ todolist: res.data.data.item }))
        dispatch(setAppSuccessAC({ success: 'todolist was successful added' }))
        return { todolist: res.data.data.item }
      } else {
        handleServerAppError(res.data.messages, dispatch, false)
        return rejectWithValue(res.data)
      }
    })
  }
)

const updateTodolistTC = createAppAsyncThunk<ParamUpdateTodolist, ParamUpdateTodolist>(
  `${todolistsSlice.name}/updateTodolist`,
  (param, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await todolistsApi.updateTodoslist(param.todoListId, param.title)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        // dispatch(changeFilterTodolistAC({ filter: filter, todoListId: todoListId }))
        dispatch(setAppSuccessAC({ success: 'todolist was successfully updated' }))
        return param
      } else {
        handleServerAppError(res.data.messages, dispatch)
        return rejectWithValue(null)
      }
    })
  }
)

export const todolistsReducer = todolistsSlice.reducer
export const todolistsThunks = { getTodolistTC, removeTodolistTC, addTodolistTC, updateTodolistTC }
export const { changeStatusTodolistAC } = todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors

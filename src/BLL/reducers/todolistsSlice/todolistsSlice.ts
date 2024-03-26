//BLL
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from 'common/utils'
import { PayloadAction, createSlice, current } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { clearTasksTodolists } from 'BLL/actions/actions'
import { setAppStatusAC, setAppSuccessAC } from '../appSlice'
import { FieldError, FilterValues, RequestStatus, Todolist } from 'common/types'
import { ResultCode } from 'common/enums'
import { todolistsApi } from 'api_DAL/todolists-api'

export type TodolistDomain = Todolist & {
  // расширяем типов, которые приходят с аpi c нужными нам фильтрами
  filter: FilterValues
  entityStatus: RequestStatus
}

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
const getTodolistTC = createAppAsyncThunk<
  { todolists: Todolist[] },
  void,
  {
    rejectValue: { errors: string[]; fieldsErrors?: FieldError[] }
  }
>(`${todolistsSlice.name}/getTodolist`, async (params, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC({ status: 'loading' }))
  try {
    const res = await todolistsApi.getTodoslists()
    // dispatch(setTodolistAC({ todolists: res.data })) //уходит в return
    dispatch(setAppStatusAC({ status: 'succeeded' }))
    return { todolists: res.data }
  } catch (err: unknown) {
    const error: AxiosError = err as AxiosError
    handleServerNetworkError(err as { message: string }, dispatch)
    return rejectWithValue({
      errors: [error.message],
      fieldsErrors: undefined,
    })
  }
})

const removeTodolistTC = createAppAsyncThunk<{ todoListId: string }, string>(
  `${todolistsSlice.name}/removeTodolist`,
  async (todoListId, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    dispatch(changeStatusTodolistAC({ entityStatus: 'loading', todoListId }))
    try {
      await todolistsApi.deleteTodoslist(todoListId)
      // dispatch(removeTodolistAC({ todoListId: todoListId }))
      dispatch(setAppSuccessAC({ success: 'todolist was successful removed' }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
      return { todoListId }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  }
)

const addTodolistTC = createAppAsyncThunk<{ todolist: Todolist }, string, AsyncThunkConfig>(
  `${todolistsSlice.name}/addNewTodolist`,
  async (title: string, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await todolistsApi.createTodoslist(title)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        // dispatch(addTodolistAC({ todolist: res.data.data.item }))
        dispatch(setAppSuccessAC({ success: 'todolist was successful added' }))
        dispatch(setAppStatusAC({ status: 'succeeded' }))
        return { todolist: res.data.data.item }
      } else {
        handleServerAppError(res.data.messages, dispatch)
        return rejectWithValue({ errors: res.data.messages, fieldsErrors: res.data.fieldsErrors })
      }
    } catch (err: unknown) {
      const error: AxiosError = err as AxiosError
      handleServerNetworkError(err as { message: string }, dispatch)
      return rejectWithValue({
        errors: [error.message],
        fieldsErrors: undefined,
      })
    }
  }
)
// type ArgsForChangeTodo = { todoListId: string; title: string }
const updateTodolistTC = createAppAsyncThunk<ParamUpdateTodolist, ParamUpdateTodolist>(
  `${todolistsSlice.name}/updateTodolist`,
  async (param, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await todolistsApi.updateTodoslist(param.todoListId, param.title)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        // dispatch(changeFilterTodolistAC({ filter: filter, todoListId: todoListId }))
        dispatch(setAppStatusAC({ status: 'succeeded' }))
        return param
      } else {
        handleServerAppError(res.data.messages, dispatch)
        return rejectWithValue({ errors: res.data.messages, fieldsErrors: res.data.fieldsErrors })
      }
    } catch (err: unknown) {
      const error: AxiosError = err as AxiosError
      handleServerNetworkError(err as { message: string }, dispatch)
      return rejectWithValue({
        errors: [error.message],
        fieldsErrors: undefined,
      })
    }
  }
)

export const todolistsReducer = todolistsSlice.reducer
export const todolistsThunks = { getTodolistTC, removeTodolistTC, addTodolistTC, updateTodolistTC }
export const { changeStatusTodolistAC } = todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors

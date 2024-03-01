//BLL
import { TodolistTypeApi, todolistsApi } from '../../api_DAL/todolists-api'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { PayloadAction, createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { clearTasksTodolists } from 'actions/actions'
import { FieldErrorType } from 'api_DAL/tasks-api'
import { RequestStatusType, setAppStatusAC, setAppSuccessAC } from 'reducers/appSlice/appSlice'
import { ResultCode } from 'reducers/tasksSlice/tasksSlice'
import { AppRootState } from 'state/storeBLL'

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistDomainType = TodolistTypeApi & {
  // расширяем типов, которые приходят с аpi c нужными нам фильтрами
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

//thunk
export const getTodolistTC = createAsyncThunk<
  { todolists: TodolistTypeApi[] },
  void,
  {
    rejectValue: { errors: string[]; fieldsErrors?: FieldErrorType[] }
  }
>('todolists/getTodolist', async (params, { dispatch, rejectWithValue }) => {
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

export const removeTodolistTC = createAsyncThunk(
  'todolists/removeTodolist',
  async (todoListId: string, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    dispatch(changeStatusTodolistAC({ entityStatus: 'loading', todoListId: todoListId }))
    try {
      await todolistsApi.deleteTodoslist(todoListId)
      // dispatch(removeTodolistAC({ todoListId: todoListId }))
      dispatch(setAppSuccessAC({ success: 'todolist was successful removed' }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
      return { todoListId }
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

export const addTodolistTC = createAsyncThunk<
  { todolist: TodolistTypeApi },
  string,
  AsyncThunkConfig
>('todolists/addNewTodolist', async (title: string, { dispatch, rejectWithValue }) => {
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
})

// export const changeTitleTodolistTC = createAsyncThunk('todolists/changeTitleTodolist', async (param: { todoListId: string, title: string }, { dispatch, rejectWithValue }) => {
//   const { todoListId, title } = param
//   dispatch(setAppStatusAC({ status: 'loading' }))
//   try {
//     const res = await todolistsApi.updateTodoslist(todoListId, title)
//     if (res.data.resultCode === ResultCode.SUCCEEDED) {
//       // dispatch(changeTitleTodolistAC({ title: title, todoListId: todoListId }))
//       dispatch(setAppSuccessAC({ success: "todolist title was successful change" }))
//       dispatch(setAppStatusAC({ status: 'succeeded' }))
//       return { title, todoListId }
//     } else {
//       handleServerAppError(res.data.messages, dispatch)
//       return rejectWithValue({ errors: res.data.messages, fieldsErrors: res.data.fieldsErrors })
//     }
//   } catch (err: unknown) {
//     const error: AxiosError = err as AxiosError;
//     handleServerNetworkError(err as { message: string }, dispatch)
//     return rejectWithValue({
//       errors: [error.message], fieldsErrors: undefined
//     })
//   }
// })

export const updateTodolistTC = createAsyncThunk(
  'todolists/updateTodolist',
  async (
    param: { todoListId: string; title: string; filter: FilterValuesType },
    { dispatch, rejectWithValue }
  ) => {
    const { todoListId, title, filter } = param
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await todolistsApi.updateTodoslist(todoListId, title)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        // dispatch(changeFilterTodolistAC({ filter: filter, todoListId: todoListId }))
        dispatch(setAppStatusAC({ status: 'succeeded' }))
        return { param }
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

const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: {
    todolists: [] as TodolistDomainType[]
  },
  reducers: {
    //state comes like a draft state!
    // addTodolistAC(state, action: PayloadAction<{ todolist: TodolistTypeApi }>) {
    //   state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
    // },
    // changeTitleTodolistAC(state, action: PayloadAction<{ title: string, todoListId: string }>) {
    //   const index = state.findIndex(t => t.id === action.payload.todoListId)
    //   if (index > -1) state[index].title = action.payload.title
    // },
    // changeFilterTodolistAC(state, action: PayloadAction<{ filter: FilterValuesType, todoListId: string }>) {
    //   const index = state.findIndex(t => t.id === action.payload.todoListId)
    //   if (index > -1) state[index].filter = action.payload.filter
    // },
    changeStatusTodolistAC(
      state,
      action: PayloadAction<{ entityStatus: RequestStatusType; todoListId: string }>
    ) {
      const index = state.todolists.findIndex((t) => t.id === action.payload.todoListId)
      if (index > -1) state.todolists[index].entityStatus = action.payload.entityStatus
    },
    // setTodolistAC(state, action: PayloadAction<{ todolists: TodolistTypeApi[] }>) {
    //   action.payload.todolists.forEach(tl => {
    //     state.push({
    //       ...tl, filter: "all", entityStatus: "idle"
    //     })
    //   })
    // },
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
        const index = state.todolists.findIndex((t) => t.id === action.payload.param.todoListId)
        if (index > -1) state.todolists[index] = { ...state.todolists[index], ...action.payload.param }
      })
      .addCase(clearTasksTodolists, (state, action) => {
        console.log('state/todolists', current(state))
        return { todolists: []}
      })
  },
  selectors: {
    selectTodolists: (state) => state.todolists
  }
})

export const todolistsReducer = todolistsSlice.reducer
export const { changeStatusTodolistAC } = todolistsSlice.actions

export const { selectTodolists } = todolistsSlice.selectors

//export const todolistsSelectors = todolistsSlice.getSelectors(
  //(state: AppRootState) => state.todolists
//)

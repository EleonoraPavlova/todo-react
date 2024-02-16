//BLL
import { TodolistTypeApi, todolistsApi } from "../../api_DAL/todolists-api";
import { RequestStatusType, setAppStatusAC, setAppSuccessAC } from "../app-reducer/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils";
import { ResultCode, getTasksTC } from "../tasks-reducers/tasks-reducer";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";
import { AxiosError } from "axios";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";

export type FilterValuesType = "all" | "completed" | "active"

export type TodolistDomainType = TodolistTypeApi & { // расширяем типов, которые приходят с аpi c нужными нам фильтрами
  filter: FilterValuesType
  entityStatus: RequestStatusType
}


//thunk
export const getTodolistTC = createAsyncThunk('todolists/getTodolist', async (params, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC({ status: 'loading' }))
  try {
    const res = await todolistsApi.getTodoslists()
    // dispatch(setTodolistAC({ todolists: res.data })) //уходит в return 
    dispatch(setAppStatusAC({ status: 'succeeded' }))
    res.data.forEach(t => {
      dispatch(getTasksTC(t.id));
    })
    return { todolists: res.data }
  } catch (err: unknown) {
    const error: AxiosError = err as AxiosError;
    handleServerNetworkError(err as { message: string }, dispatch)
    return rejectWithValue({
      errors: [error.message], fieldsErrors: undefined
    })
  }
})


export const removeTodolistTC = createAsyncThunk('todolists/removeTodolist', async (todoListId: string, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC({ status: 'loading' }))
  dispatch(changeStatusTodolistAC({ entityStatus: 'loading', todoListId: todoListId }))
  try {
    await todolistsApi.deleteTodoslist(todoListId)
    // dispatch(removeTodolistAC({ todoListId: todoListId }))
    dispatch(setAppSuccessAC({ success: "todolist was successful removed" }))
    dispatch(setAppStatusAC({ status: 'succeeded' }))
    return { todoListId }
  } catch (err: unknown) {
    const error: AxiosError = err as AxiosError;
    handleServerNetworkError(err as { message: string }, dispatch)
    return rejectWithValue({
      errors: [error.message], fieldsErrors: undefined
    })
  }
})


export const addTodolistTC = createAsyncThunk<{ todolist: TodolistTypeApi }, string, AsyncThunkConfig>('todolists/addNewTodolist',
  async (title: string, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await todolistsApi.createTodoslist(title)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        // dispatch(addTodolistAC({ todolist: res.data.data.item }))
        dispatch(setAppSuccessAC({ success: "todolist was successful added" }))
        dispatch(setAppStatusAC({ status: 'succeeded' }))
        return { todolist: res.data.data.item }
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

export const changeTitleTodolistTC = createAsyncThunk('todolists/changeTitleTodolist', async (param: { todoListId: string, title: string }, { dispatch, rejectWithValue }) => {
  const { todoListId, title } = param
  dispatch(setAppStatusAC({ status: 'loading' }))
  try {
    const res = await todolistsApi.updateTodoslist(todoListId, title)
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      // dispatch(changeTitleTodolistAC({ title: title, todoListId: todoListId }))
      dispatch(setAppSuccessAC({ success: "todolist title was successful change" }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
      return { title, todoListId }
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


export const changeFilterTodolistTC = createAsyncThunk('todolists/changeFilterTodolis', async (param: { todoListId: string, title: string, filter: FilterValuesType }, { dispatch, rejectWithValue }) => {
  const { todoListId, title, filter } = param
  dispatch(setAppStatusAC({ status: 'loading' }))
  try {
    const res = await todolistsApi.updateTodoslist(todoListId, title)
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      // dispatch(changeFilterTodolistAC({ filter: filter, todoListId: todoListId }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
      return { filter: filter, todoListId: todoListId }
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


const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    //state comes like a draft state!
    // addTodolistAC(state, action: PayloadAction<{ todolist: TodolistTypeApi }>) {
    //   state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
    // },
    // changeTitleTodolistAC(state, action: PayloadAction<{ title: string, todoListId: string }>) {
    //   const index = state.findIndex(t => t.id === action.payload.todoListId)
    //   if (index > -1) state[index].title = action.payload.title
    // },
    changeFilterTodolistAC(state, action: PayloadAction<{ filter: FilterValuesType, todoListId: string }>) {
      const index = state.findIndex(t => t.id === action.payload.todoListId)
      if (index > -1) state[index].filter = action.payload.filter
    },
    changeStatusTodolistAC(state, action: PayloadAction<{ entityStatus: RequestStatusType, todoListId: string }>) {
      const index = state.findIndex(t => t.id === action.payload.todoListId)
      if (index > -1) state[index].entityStatus = action.payload.entityStatus
    },
    // setTodolistAC(state, action: PayloadAction<{ todolists: TodolistTypeApi[] }>) {
    //   action.payload.todolists.forEach(tl => {
    //     state.push({
    //       ...tl, filter: "all", entityStatus: "idle"
    //     })
    //   })
    // },
    clearTodolistAC(state) {
      return produce(state, (draftState) => {
        draftState.splice(0); // Очищаем массив путем удаления всех элементов
      });
    },
  },
  extraReducers: (builder) => { //для обработки чужих редьюсеров
    builder
      .addCase(getTodolistTC.fulfilled, (state, action) => {
        return action.payload.todolists.forEach(tl => {
          state.push({
            ...tl, filter: "all", entityStatus: "idle"
          })
        })
      })
      .addCase(removeTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex(t => t.id === action.payload.todoListId)
        if (index > -1) state.splice(index, 1)
      })
      .addCase(addTodolistTC.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
      })
      .addCase(changeTitleTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex(t => t.id === action.payload.todoListId)
        if (index > -1) state[index].title = action.payload.title
      })
  }
})

export const todolistsReducer = slice.reducer
export const { changeFilterTodolistAC,
  changeStatusTodolistAC, clearTodolistAC } = slice.actions


//thunk
// export const getTodolistTC_ = (): AppThunkType => //функц прослойка для dispatch api
//   async dispatch => {
//     dispatch(setAppStatusAC({ status: 'loading' }))
//     try {
//       const res = await todolistsApi.getTodoslists()
//       dispatch(setTodolistAC({ todolists: res.data }))
//       dispatch(setAppStatusAC({ status: 'succeeded' }))
//       res.data.forEach(t => {
//         dispatch(getTasksTC(t.id));
//       })
//     } catch (err) {
//       handleServerNetworkError(err as { message: string }, dispatch)
//     }
//   }


// export const removeTodolistTC_ = (todoListId: string): AppThunkType =>  //функц прослойка для dispatch api
//   async dispatch => {
//     dispatch(setAppStatusAC({ status: 'loading' }))
//     dispatch(changeStatusTodolistAC({ entityStatus: 'loading', todoListId: todoListId }))
//     try {
//       todolistsApi.deleteTodoslist(todoListId)
//       dispatch(removeTodolistAC({ todoListId: todoListId }))
//       dispatch(setAppSuccessAC({ success: "todolist was successful removed" }))
//       dispatch(setAppStatusAC({ status: 'succeeded' }))
//     } catch (err) {
//       handleServerNetworkError(err as { message: string }, dispatch)
//     }
//   }

// export const addTodolistTC_ = (title: string): AppThunkType => //функц прослойка для dispatch api
//   async dispatch => {
//     dispatch(setAppStatusAC({ status: 'loading' }))
//     try {
//       const res = await todolistsApi.createTodoslist(title)
//       if (res.data.resultCode === ResultCode.SUCCEEDED) {
//         dispatch(addTodolistAC({ todolist: res.data.data.item }))
//         dispatch(setAppSuccessAC({ success: "todolist was successful added" }))
//         dispatch(setAppStatusAC({ status: 'succeeded' }))
//       } else {
//         handleServerAppError(res.data.messages, dispatch)
//       }
//     } catch (err) {
//       handleServerNetworkError(err as { message: string }, dispatch)
//     }
//   }

// export const changeTitleTodolistTC_ = (todoListId: string, title: string): AppThunkType =>  //функц прослойка для dispatch api
//   async dispatch => {
//     dispatch(setAppStatusAC({ status: 'loading' }))
//     try {
//       const res = await todolistsApi.updateTodoslist(todoListId, title)
//       if (res.data.resultCode === ResultCode.SUCCEEDED) {
//         dispatch(changeTitleTodolistAC({ title: title, todoListId: todoListId }))
//         dispatch(setAppSuccessAC({ success: "todolist title was successful change" }))
//         dispatch(setAppStatusAC({ status: 'succeeded' }))
//       } else {
//         handleServerAppError(res.data.messages, dispatch)
//       }
//     } catch (err) {
//       handleServerNetworkError(err as { message: string }, dispatch)
//     }
//   }

// export const changeFilterTodolistTC = (todoListId: string, title: string, filter: FilterValuesType): AppThunkType =>  //функц прослойка для dispatch api
//   async dispatch => {
//     dispatch(setAppStatusAC({ status: 'loading' }))
//     try {
//       const res = await todolistsApi.updateTodoslist(todoListId, title)
//       if (res.data.resultCode === ResultCode.SUCCEEDED) {
//         dispatch(changeFilterTodolistAC({ filter: filter, todoListId: todoListId }))
//         dispatch(setAppStatusAC({ status: 'succeeded' }))
//       } else {
//         handleServerAppError(res.data.messages, dispatch)
//       }
//     } catch (err) {
//       handleServerNetworkError(err as { message: string }, dispatch)
//     }
//   }
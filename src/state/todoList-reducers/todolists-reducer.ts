//BLL
import { TodolistTypeApi, todolistsApi } from "../../api_DAL/todolists-api";
import { RequestStatusType, setAppStatusAC, setAppSuccessAC } from "../app-reducer/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils";
import { ResultCode, getTasksTC } from "../tasks-reducers/tasks-reducer";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";
import { AppThunkType } from "../storeBLL";

export type FilterValuesType = "all" | "completed" | "active"

export type TodolistDomainType = TodolistTypeApi & { // расширяем типов, которые приходят с аpi c нужными нам фильтрами
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

export const initialState: TodolistDomainType[] = []


const slice = createSlice({
  name: "todolists",
  initialState: initialState,
  reducers: {
    //state comes like a draft state!
    removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
      // let a = current(state)//debag state
      const index = state.findIndex(t => t.id === action.payload.todolistId)
      if (index > -1) {
        state.splice(index, 1)
      }
    },
    addTodolistAC(state, action: PayloadAction<{ todolist: TodolistTypeApi }>) {
      state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
    },
    changeTitleTodolistAC(state, action: PayloadAction<{ title: string, todolistId: string }>) {
      const index = state.findIndex(t => t.id === action.payload.todolistId)
      if (index > -1) state[index].title = action.payload.title
    },
    changeFilterTodolistAC(state, action: PayloadAction<{ filter: FilterValuesType, todolistId: string }>) {
      const index = state.findIndex(t => t.id === action.payload.todolistId)
      if (index > -1) state[index].filter = action.payload.filter
    },
    changeStatusTodolistAC(state, action: PayloadAction<{ entityStatus: RequestStatusType, todolistId: string }>) {
      const index = state.findIndex(t => t.id === action.payload.todolistId)
      if (index > -1) state[index].entityStatus = action.payload.entityStatus
    },
    setTodolistAC(state, action: PayloadAction<{ todolists: TodolistTypeApi[] }>) {
      action.payload.todolists.forEach(tl => {
        state.push({
          ...tl, filter: "all", entityStatus: "idle"
        })
      })
    },
    clearTodolistAC(state) {
      return produce(state, (draftState) => {
        draftState.splice(0); // Очищаем массив путем удаления всех элементов
      });
    },
  },
})

export const todolistsReducer = slice.reducer
export const { removeTodolistAC, addTodolistAC, changeTitleTodolistAC, changeFilterTodolistAC,
  changeStatusTodolistAC, setTodolistAC, clearTodolistAC } = slice.actions


//thunk
export const getTodolistTC = (): AppThunkType => //функц прослойка для dispatch api
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await todolistsApi.getTodoslists()
      dispatch(setTodolistAC({ todolists: res.data }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
      res.data.forEach(t => {
        dispatch(getTasksTC(t.id));
      })
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
    }
  }


export const removeTodolistTC = (todolistId: string): AppThunkType =>  //функц прослойка для dispatch api
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    dispatch(changeStatusTodolistAC({ entityStatus: 'loading', todolistId: todolistId }))
    try {
      todolistsApi.deleteTodoslist(todolistId)
      dispatch(removeTodolistAC({ todolistId: todolistId }))
      dispatch(setAppSuccessAC({ success: "todolist was successful removed" }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
    }
  }

export const addNewTodolistTC = (title: string): AppThunkType => //функц прослойка для dispatch api
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await todolistsApi.createTodoslist(title)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(addTodolistAC({ todolist: res.data.data.item }))
        dispatch(setAppSuccessAC({ success: "todolist was successful added" }))
        dispatch(setAppStatusAC({ status: 'succeeded' }))
      } else {
        handleServerAppError(res.data.messages, dispatch)
      }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
    }
  }

export const changeTitleTodolistTC = (todolistId: string, title: string): AppThunkType =>  //функц прослойка для dispatch api
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await todolistsApi.updateTodoslist(todolistId, title)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(changeTitleTodolistAC({ title: title, todolistId: todolistId }))
        dispatch(setAppSuccessAC({ success: "todolist title was successful change" }))
        dispatch(setAppStatusAC({ status: 'succeeded' }))
      } else {
        handleServerAppError(res.data.messages, dispatch)
      }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
    }
  }

export const changeFilterTodolistTC = (todolistId: string, title: string, filter: FilterValuesType): AppThunkType =>  //функц прослойка для dispatch api
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await todolistsApi.updateTodoslist(todolistId, title)
      if (res.data.resultCode === ResultCode.SUCCEEDED) {
        dispatch(changeFilterTodolistAC({ filter: filter, todolistId: todolistId }))
        dispatch(setAppStatusAC({ status: 'succeeded' }))
      } else {
        handleServerAppError(res.data.messages, dispatch)
      }
    } catch (err) {
      handleServerNetworkError(err as { message: string }, dispatch)
    }
  }
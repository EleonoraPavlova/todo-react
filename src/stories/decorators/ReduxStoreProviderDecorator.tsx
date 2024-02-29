import React from 'react'
import { Provider } from 'react-redux'
import { AppRootState, RootReducerType } from '../../state/storeBLL'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { todolistsReducer } from '../../state/todolists/todolistsSlice'
import { tasksReducer } from '../../state/tasks-reducers/tasks-reducer'
import { startStateTodolists } from '../../state/initialState/todolistsStartState'
import { startStateTasks } from '../../state/initialState/tasksStartState'
import { appReducer, appStartState } from '../../reducers/app-reducer/appSlice'
import thunk from 'redux-thunk'
import {
  authReducer,
  initialAuthState,
} from '../../reducers/app-reducer/auth-reducers/auth-reducer'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  todolist: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})

export const initialGlobalState: AppRootState = {
  todolist: startStateTodolists,
  tasks: startStateTasks,
  app: appStartState,
  auth: initialAuthState,
}

export const storyBookStore = configureStore({
  reducer: rootReducer,
  preloadedState: initialGlobalState,
})

export const ReduxStoreProviderDecorator = (story: any) => {
  return (
    <MemoryRouter>
      <Provider store={storyBookStore}>{story()}</Provider>
    </MemoryRouter>
  )
}

import React from 'react'
import { Provider } from 'react-redux'
import { startStateTasks } from '../../state/initialState/tasksStartState'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { TodolistDomainType, todolistsReducer } from 'reducers/todolistsSlice/todolistsSlice'
import { tasksReducer } from 'reducers/tasksSlice/tasksSlice'
import { appReducer, appStartState } from 'reducers/appSlice/appSlice'
import { authReducer, initialAuthState } from 'reducers/authSlice/authSlice'


export const initialGlobalState = {
  todolists: {
    todolists: [] as TodolistDomainType[]
  },
  tasks: startStateTasks,
  app: appStartState,
  auth: initialAuthState,
}


export const storyBookStore = configureStore({
  reducer: {
  //все dispatch приходят в rootReducer, а он самостоятельно раскидывает их
  //по нужным напрвлениям
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
  },
  preloadedState: initialGlobalState,
})


export type AppRootState = ReturnType<typeof storyBookStore.getState>

export const ReduxStoreProviderDecorator = (story: any) => {
  return (
    <MemoryRouter>
      <Provider store={storyBookStore}>{story()}</Provider>
    </MemoryRouter>
  )
}

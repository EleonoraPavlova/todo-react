import React from 'react'
import { Provider } from 'react-redux'
import { startStateTasks } from '../../moc/initialState/tasksStartState'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { TodolistDomain, todolistsReducer } from 'BLL/reducers/todolistsSlice'
import { tasksReducer } from 'BLL/reducers/tasksSlice'
import { appReducer, appStartState } from 'BLL/reducers/appSlice'
import { authReducer, initialAuthState } from 'BLL/reducers/authSlice'

export const initialGlobalState = {
  todolists: {
    todolists: [] as TodolistDomain[],
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

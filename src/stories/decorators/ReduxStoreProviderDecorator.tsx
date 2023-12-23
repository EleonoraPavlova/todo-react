import React from 'react';
import { Provider } from "react-redux";
import { AppRootState } from "../../state/storeBLL";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { todolistsReducer } from "../../state/todoList-reducers/todolists-reducer";
import { tasksReducer } from "../../state/tasks-reducers/tasks-reducer";
import { startStateTodolists } from "../../state/initialState/todolistsStartState";
import { startStateTasks } from "../../state/initialState/tasksStartState";
import { appReducer } from "../../state/app-reducer/app-reducer";
import { appStartState } from "../../state/initialState/appStartState";
import thunk from "redux-thunk";
import { authReducer, initialAuthState } from "../../state/auth-reducers/auth-reducer";


const rootReducer = combineReducers({
  todolist: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer
})

export const initialGlobalState: AppRootState = {
  todolist: startStateTodolists,
  tasks: startStateTasks,
  app: appStartState,
  auth: initialAuthState
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (story: any) => {
  return <Provider store={storyBookStore}>{story()}</Provider>
}
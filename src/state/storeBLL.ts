import { tasksReducer } from "./tasks-reducers/tasks-reducer";
import { todolistsReducer } from "./todoList-reducers/todolists-reducer";
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { appReducer } from "./app-reducer/app-reducer";
import { authReducer } from "./auth-reducers/auth-reducer";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { AnyAction } from "redux";

//обязательно Provider в App
//отдельный reducer отвечает за каждую ветку
//tasksReducer - за мофицикац тасок
//todolistsReducer - за todolist

export type AppRootState = ReturnType<typeof store.getState>

const rootReducer = combineReducers({ //все dispatch приходят в rootReducer, а он самостоятельно раскидывает их 
  //по нужным напрвлениям
  todolist: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer
})

export const store = configureStore({
  reducer: rootReducer
})

//типизация dispatch санки
export type AppDispatchType = ThunkDispatch<AppRootState, unknown, AnyAction> // будет приниматься любой action
//export type AppAllActionsType = ActionsTasksType | ActionsTodolistsType | ActionsAppType | ActionsAuthType // all actions in app
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AnyAction>//in thunk to dispatch other thunk and any actions(like a main type)
//<ReturnType = void>значение по умолчанию

//@ts-ignore
window.store = store
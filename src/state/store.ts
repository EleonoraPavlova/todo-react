import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import { tasksReducer } from "./tasks-reducers/tasks-reducer";
import { TodolistDomainType, todolistsReducer } from "./todoList-reducers/todolists-reducer";
import thunk, { ThunkAction } from "redux-thunk"
import { TasksObjType } from "../api/tasks-api";

//обязательно Provider в App


//одельный reducer отвечает за каждую ветку
//tasksReducer - за мофицикац тасок
//todolistsReducer - за todolist


export type AppRootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({ //все dispatch приходят в rootReducer, а он самостоятельно раскидывает их 
  //по нужным напрвлениям
  todolist: todolistsReducer,
  tasks: tasksReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk)) //подкл thunk

// export type AppActionsType = TasksObjType | TodolistDomainType | AppRootState

// export type AppThunkType<RetypnType = void> = ThunkAction<RetypnType, AppRootState, unknown, Action>



//@ts-ignore
window.store = store


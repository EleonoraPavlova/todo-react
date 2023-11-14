import { applyMiddleware, combineReducers, createStore } from "redux";
import { tasksReducer } from "./tasks-reducers/tasks-reducer";
import { todolistsReducer } from "./todoList-reducers/todolists-reducer";
import thunk from "redux-thunk"

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


//@ts-ignore
window.store = store


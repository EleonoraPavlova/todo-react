import { AnyAction, applyMiddleware, combineReducers, createStore } from "redux";
import { tasksReducer } from "./tasks-reducers/tasks-reducer";
import { todolistsReducer } from "./todoList-reducers/todolists-reducer";
import thunk, { ThunkDispatch } from "redux-thunk"
import { appReducer } from "./app-reducer/app-reducer";

//обязательно Provider в App
//одельный reducer отвечает за каждую ветку
//tasksReducer - за мофицикац тасок
//todolistsReducer - за todolist

export type AppRootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({ //все dispatch приходят в rootReducer, а он самостоятельно раскидывает их 
  //по нужным напрвлениям
  todolist: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk)) //подкл thunk
//следит что приходит: обычный объект или функция-санки, которую нужно вызвать
export type AppDispatchType = ThunkDispatch<AppRootState, unknown, AnyAction> //будет приниматься любой action

//@ts-ignore
window.store = store


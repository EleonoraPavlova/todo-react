import { AnyAction, applyMiddleware, combineReducers, createStore } from "redux";
import { ActionsTasksType, tasksReducer } from "./tasks-reducers/tasks-reducer";
import { ActionsTodolistsType, todolistsReducer } from "./todoList-reducers/todolists-reducer";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk"
import { ActionsAppType, appReducer } from "./app-reducer/app-reducer";

//обязательно Provider в App
//одельный reducer отвечает за каждую ветку
//tasksReducer - за мофицикац тасок
//todolistsReducer - за todolist

export type AppRootState = ReturnType<typeof store.getState>

const rootReducer = combineReducers({ //все dispatch приходят в rootReducer, а он самостоятельно раскидывает их 
  //по нужным напрвлениям
  todolist: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk)) //подкл thunk
//следит что приходит: обычный объект или функция-санки, которую нужно вызвать

//типизация dispatch санки
export type AppDispatchType = ThunkDispatch<AppRootState, unknown, AnyAction> // будет приниматься любой action

export type AppAllActionsType = ActionsTasksType | ActionsTodolistsType | ActionsAppType// all actions in app
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppAllActionsType>//in thunk to dispatch other thunk and any actions(like a main type)
//<ReturnType = void>значение по умолчанию

//@ts-ignore
window.store = store
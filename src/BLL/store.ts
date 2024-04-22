import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { configureStore, UnknownAction } from '@reduxjs/toolkit'
import { todolistsReducer, appReducer, authReducer, tasksReducer } from '../BLL/reducers'

export const store = configureStore({
  reducer: {
    //все dispatch приходят в rootReducer, а он самостоятельно раскидывает их
    //по нужным напрвлениям
    app: appReducer,
    auth: authReducer,
    todolists: todolistsReducer,
    tasks: tasksReducer,
  },
})

export type AppRootState = ReturnType<typeof store.getState>

//типизация dispatch санки
export type AppDispatch = ThunkDispatch<AppRootState, unknown, UnknownAction> // будет приниматься любой action
//export type AppAllActionsType = ActionsTasksType | ActionsTodolistsType | ActionsAppType | ActionsAuthType // all actions in app
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, UnknownAction> //in thunk to dispatch other thunk and any actions(like a main type)
//<ReturnType = void>значение по умолчанию

//export type AppDispatch = typeof store.getState // it will be right! the same
//@ts-ignore
window.store = store

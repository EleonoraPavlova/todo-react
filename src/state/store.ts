import { combineReducers, createStore } from "redux";
import { tasksReducer } from "./tasks-reducers/tasks-reducer";
import { todolistsReducer } from "./todoList-reducers/todolists-reducer";

//одельный reducer отвечает за каждую ветку
//tasksReducer - за мофицикац тасок
//todolistsReducer - за todolist

// type AppRootState = {
//   todolist: TodoListsType[],
//   tasks: TasksObjType
// } или так записать:
type AppRootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({ //все dispatch приходят в rootReducer, а он самостоятельно раскидывает их 
  //по нужным напрвлениям
  todolist: todolistsReducer,
  tasks: tasksReducer
})

export const store = createStore(rootReducer)



//@ts-ignore
window.store = store


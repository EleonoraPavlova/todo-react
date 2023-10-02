import React from 'react';
import { Provider } from "react-redux";
import { AppRootState } from "../state/store";
import { combineReducers, createStore } from "redux";
import { todolistsReducer } from "../state/todoList-reducers/todolists-reducer";
import { tasksReducer } from "../state/tasks-reducers/tasks-reducer";
import { v1 } from "uuid";

const rootReducer = combineReducers({
  todolist: todolistsReducer,
  tasks: tasksReducer
})


export const initialGlobalState: AppRootState =
{
  todolist: [
    { id: "todoListId1", title: "What to learn", filter: "all" },
    { id: "todoListId2", title: "What to buy", filter: "all" }
  ],
  tasks: {
    ["todoListId1"]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Redax", isDone: false }
    ],
    ["todoListId2"]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Juice", isDone: true },
      { id: v1(), title: "Meat", isDone: false },
      { id: v1(), title: "Bread", isDone: false }
    ]
  }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState)

export const ReduxStoreProviderDecorator = (story: any) => {
  return <Provider store={storyBookStore}>{story()}</Provider>
}


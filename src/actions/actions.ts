import { createAction } from "@reduxjs/toolkit";
import { TasksObjType } from "api_DAL/tasks-api";
import { TodolistDomainType } from "state/todoList-reducers/todolists-reducer";

export type ClearTasksTodolistsType = {
  tasks: TasksObjType
  todolists: TodolistDomainType[]
}

export const clearTasksTodolists = createAction<ClearTasksTodolistsType>('actions/clear-tasks-todolists')
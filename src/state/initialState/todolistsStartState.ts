import { TodolistDomainType } from "../todoList-reducers/todolists-reducer";
import { v1 } from "uuid";

const todolistId1 = v1()
const todolistId2 = v1()

export const startStateTodolists: TodolistDomainType[] = [
  {
    id: todolistId1, title: 'What to learn', filter: 'all', addedDate: "",
    order: 0, entityStatus: "idle"
  },
  {
    id: todolistId2, title: 'What to buy', filter: 'all', addedDate: "",
    order: 0, entityStatus: "loading"//status сущности
  }
]
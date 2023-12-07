import { TodolistDomainType } from "../todoList-reducers/todolists-reducer";
import { todoListId1, todoListId2 } from "./id-utils";

export const startStateTodolists: TodolistDomainType[] = [
  {
    id: todoListId1, title: 'What to learn', filter: 'all', addedDate: "",
    order: 0, entityStatus: "idle"
  },
  {
    id: todoListId2, title: 'What to buy', filter: 'all', addedDate: "",
    order: 0, entityStatus: "idle"
  }
]
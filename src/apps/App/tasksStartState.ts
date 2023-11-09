import { v1 } from "uuid";
import { TaskPriorities, TaskStatuses, TasksObjType } from "../../api/tasks-api";
import { todoListId1, todoListId2 } from "./id-utils";

export const startStateTasks: TasksObjType = {
  ["todolistId1"]: [
    {
      id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
      description: "", completed: true,
      priority: TaskPriorities.Low, startDate: "",
      todoListId: todoListId1, deadline: "", order: 1, addedDate: ""
    },
    {
      id: v1(), title: "JS", status: TaskStatuses.Completed,
      description: "", completed: true,
      priority: TaskPriorities.Low, startDate: "",
      todoListId: todoListId1, deadline: "", order: 1, addedDate: ""
    },
    {
      id: v1(), title: "ReactJS", status: TaskStatuses.New,
      description: "", completed: true,
      priority: TaskPriorities.Low, startDate: "",
      todoListId: todoListId1, deadline: "", order: 1, addedDate: ""
    },
    {
      id: v1(), title: "Redax", status: TaskStatuses.New,
      description: "", completed: true,
      priority: TaskPriorities.Low, startDate: "",
      todoListId: todoListId1, deadline: "", order: 1, addedDate: ""
    }
  ],
  ["todolistId2"]: [
    {
      id: v1(), title: "Milk", status: TaskStatuses.Completed,
      description: "", completed: true,
      priority: TaskPriorities.Low, startDate: "",
      todoListId: todoListId2, deadline: "", order: 1, addedDate: ""
    },
    {
      id: v1(), title: "Juice", status: TaskStatuses.Completed,
      description: "", completed: true,
      priority: TaskPriorities.Low, startDate: "",
      todoListId: todoListId2, deadline: "", order: 1, addedDate: ""
    },
    {
      id: v1(), title: "Meat", status: TaskStatuses.New,
      description: "", completed: true,
      priority: TaskPriorities.Low, startDate: "",
      todoListId: todoListId2, deadline: "", order: 1, addedDate: ""
    },
    {
      id: v1(), title: "Bread", status: TaskStatuses.New,
      description: "", completed: true,
      priority: TaskPriorities.Low, startDate: "",
      todoListId: todoListId2, deadline: "", order: 1, addedDate: ""
    }
  ],
}
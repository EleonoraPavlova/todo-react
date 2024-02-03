import { TaskPriorities, TaskStatuses, TasksObjType } from "../../api_DAL/tasks-api";
import { v1 } from "uuid";

export const todolistId1 = v1()
export const todolistId2 = v1()

export const startStateTasks: TasksObjType = {
  [todolistId1]: [
    {
      id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
      description: "", completed: true,
      priority: TaskPriorities.Low, startDate: "",
      todolistId: todolistId1, deadline: "", order: 1, addedDate: ""
    },
    {
      id: v1(), title: "JS", status: TaskStatuses.Completed,
      description: "", completed: true,
      priority: TaskPriorities.Low, startDate: "",
      todolistId: todolistId1, deadline: "", order: 1, addedDate: ""
    },
    {
      id: v1(), title: "ReactJS", status: TaskStatuses.New,
      description: "", completed: true,
      priority: TaskPriorities.Low, startDate: "",
      todolistId: todolistId1, deadline: "", order: 1, addedDate: ""
    },
    {
      id: v1(), title: "Redax", status: TaskStatuses.New,
      description: "", completed: true,
      priority: TaskPriorities.Low, startDate: "",
      todolistId: todolistId1, deadline: "", order: 1, addedDate: ""
    }
  ],
  [todolistId2]: [
    {
      id: v1(), title: "Milk", status: TaskStatuses.Completed,
      description: "", completed: true,
      priority: TaskPriorities.Low, startDate: "",
      todolistId: todolistId2, deadline: "", order: 1, addedDate: ""
    },
    {
      id: v1(), title: "Juice", status: TaskStatuses.Completed,
      description: "", completed: true,
      priority: TaskPriorities.Low, startDate: "",
      todolistId: todolistId2, deadline: "", order: 1, addedDate: ""
    },
    {
      id: v1(), title: "Meat", status: TaskStatuses.New,
      description: "", completed: true,
      priority: TaskPriorities.Low, startDate: "",
      todolistId: todolistId2, deadline: "", order: 1, addedDate: ""
    },
    {
      id: v1(), title: "Bread", status: TaskStatuses.New,
      description: "", completed: true,
      priority: TaskPriorities.Low, startDate: "",
      todolistId: todolistId2, deadline: "", order: 1, addedDate: ""
    }
  ],
}
import { instanse } from "./todolists-api"

const settings = {
  withCredentials: true,  //есть валидац токен
  headers: {
    "API-KEY": "6a891b51-a742-4c47-8da1-58a8df99feb7"
  }
}

export enum TaskStatuses { //какое то одно из значений
  New = 0,        //false
  InProgress = 1,
  Completed = 2,  //true
  Draft = 3
}

export enum TaskPriorities { //какое то одно из значений
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4
}


export type TaskTypeApi = {
  description: string
  title: string
  completed: boolean
  status: TaskStatuses | number
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type TasksObjType = {
  [key: string]: TaskTypeApi[]
}

export type GetTaskResponse = {
  error: string
  totalCount: number
  items: TaskTypeApi[]
}

export type ResponseType<Data = {}> = {
  resultCode: number
  messages: string[]
  data: Data
}


export type UpdateTaskModel = { //какие поля можно обновить в tasks
  title: string
  description: string
  status: number
  priority: number
  startDate: string
  deadline: string
}

export const tasksApi = {
  getTasks(todolistId: string) {
    let promise = instanse.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
    return promise
  },

  createTasks(title: string, todolistId: string) {
    try {
      let promise = instanse.post<ResponseType<{ item: GetTaskResponse }>>(`todo-lists/${todolistId}/tasks`, {
        title: title
      }, settings)
      return promise
    } catch {
      throw new Error("Enter title or todolistId")
    }
  },

  deleteTasks(todolistId: string, taskId: string) {
    try {
      let promise = instanse.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
      return promise
    } catch (err) {
      throw new Error("Something went wrong")
    }
  },

  updateTaskTitle(todolistId: string, taskId: string, title: string) {
    let promise = instanse.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, { title: title })
    return promise
  },

  updateTaskAtAll(todolistId: string, taskId: string, payload: UpdateTaskModel) {
    let promise = instanse.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, payload)
    return promise
  }
}
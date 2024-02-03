import { instanse, settings } from "./todolists-api"

export enum TaskStatuses {
  New = 0,        //false
  InProgress = 1,
  Completed = 2,  //true
  Draft = 3
}

export enum TaskPriorities {
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
  todolistId: string
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

export type FieldErrorType = {
  field: string
  error: string
}

export type ResponseType<Data = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors?: FieldErrorType[]
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
    return instanse.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
  },

  createTasks(title: string, todolistId: string) {
    return instanse.post<ResponseType<{ item: TaskTypeApi }>>(`todo-lists/${todolistId}/tasks`, {
      title: title
    }, settings)
  },

  deleteTask(todolistId: string, taskId: string) {
    return instanse.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },

  updateTaskTitle(todolistId: string, taskId: string, title: string) {
    return instanse.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, { title: title })
  },

  updateTaskAtAll(todolistId: string, taskId: string, payload: UpdateTaskModel) {
    return instanse.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, payload)
  }
}
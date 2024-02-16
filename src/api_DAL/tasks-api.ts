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
  getTasks(todoListId: string) {
    return instanse.get<GetTaskResponse>(`todo-lists/${todoListId}/tasks`)
  },

  createTasks(title: string, todoListId: string) {
    return instanse.post<ResponseType<{ item: TaskTypeApi }>>(`todo-lists/${todoListId}/tasks`, {
      title: title
    }, settings)
  },

  deleteTask(todoListId: string, taskId: string) {
    return instanse.delete<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`)
  },

  updateTaskTitle(todoListId: string, taskId: string, title: string) {
    return instanse.put<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`, { title: title })
  },

  updateTaskAtAll(todoListId: string, taskId: string, payload: UpdateTaskModel) {
    return instanse.put<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`, payload)
  }
}
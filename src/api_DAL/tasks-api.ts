import { UpdateTaskModelForReducerFn } from 'reducers/tasksSlice/tasksSlice'
import { instanse, settings } from './todolists-api'

export enum TaskStatuses {
  New = 0, //false
  InProgress = 1,
  Completed = 2, //true
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export type Task = {
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

export type Tasks = {
  [key: string]: Task[]
}

export type GetTaskResponse = {
  error: string
  totalCount: number
  items: Task[]
}

export type FieldError = {
  field: string
  error: string
}

export type ResponseType<Data = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors?: FieldError[]
  data: Data
}

export type UpdateTaskModel = {
  //какие поля можно обновить в tasks
  title: string
  description: string
  status: number
  priority: number
  startDate: string
  deadline: string
}

export type AddTaskParams = {
  title: string
  todoListId: string
}

export type DeleteTaskParams = {
  todoListId: string
  taskId: string
}

export type UpdateTaskParams = {
  todoListId: string
  taskId: string
  domainModel: UpdateTaskModelForReducerFn
}

export const tasksApi = {
  getTasks(todoListId: string) {
    return instanse.get<GetTaskResponse>(`todo-lists/${todoListId}/tasks`)
  },

  createTask(params: AddTaskParams) {
    return instanse.post<ResponseType<{ item: Task }>>(
      `todo-lists/${params.todoListId}/tasks`,
      { title: params.title },
      settings
    )
  },

  deleteTask(params: DeleteTaskParams) {
    return instanse.delete<ResponseType>(`/todo-lists/${params.todoListId}/tasks/${params.taskId}`)
  },

  updateTaskTitle(todoListId: string, taskId: string, title: string) {
    return instanse.put<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`, { title: title })
  },

  updateTaskAtAll(params: UpdateTaskParams) {
    return instanse.put<ResponseType>(`/todo-lists/${params.todoListId}/tasks/${params.taskId}`, params.domainModel)
  },
}

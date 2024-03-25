import { TaskPriorities, TaskStatuses } from 'common/enums'

export type Response<Data = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors?: FieldError[]
  data: Data
}

export type LoginParams = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: boolean
}

//
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

export type UpdateTaskModelForReducerFn = {
  //какие поля можно обновить в tasks
  title?: string
  description?: string
  status?: number
  priority?: number
  startDate?: string
  deadline?: string
}

//
export type Todolist = {
  id: string
  title: string
  addedDate: string
  order: number
}

//
export type FieldError = {
  field: string
  error: string
}

//
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export type FilterValues = 'all' | 'completed' | 'active'

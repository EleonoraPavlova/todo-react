import { TaskPriorities, TaskStatuses } from 'common/enums'

export type ResponseData<Data = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
  data: Data
}

export type ThunkErrorApiConfig = {
  errors: string[]
  fieldsErrors: string[] | FieldError[]
}

export type FieldError = {
  field: string
  error: string
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

export type Tasks = Record<string, Task[]>

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

export type UpdateTaskParams = {
  //какие поля можно обновить в tasks
  todoListId: string
  taskId: string
  domainModel: Partial<UpdateTaskModel>
}

//
export type Todolist = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type TodolistDomain = Todolist & {
  // расширяем типов, которые приходят с аpi c нужными нам фильтрами
  filter: FilterValues
  entityStatus: RequestStatus
}

//
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export type FilterValues = 'all' | 'completed' | 'active'

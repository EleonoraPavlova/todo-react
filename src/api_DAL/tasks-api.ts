import { instance } from 'api_DAL'
import { AddTaskParams, DeleteTaskParams, Response, Task, UpdateTaskParams } from '../common/types'

type GetTaskResponse = {
  error: string
  totalCount: number
  items: Task[]
}

export const tasksApi = {
  getTasks(todoListId: string) {
    return instance.get<GetTaskResponse>(`todo-lists/${todoListId}/tasks`)
  },

  createTask(params: AddTaskParams) {
    return instance.post<Response<{ item: Task }>>(`todo-lists/${params.todoListId}/tasks`, { title: params.title })
  },

  deleteTask(params: DeleteTaskParams) {
    return instance.delete<Response>(`/todo-lists/${params.todoListId}/tasks/${params.taskId}`)
  },

  updateTaskTitle(todoListId: string, taskId: string, title: string) {
    return instance.put<Response>(`/todo-lists/${todoListId}/tasks/${taskId}`, { title: title })
  },

  updateTaskAtAll(params: UpdateTaskParams) {
    return instance.put<Response>(`/todo-lists/${params.todoListId}/tasks/${params.taskId}`, params.domainModel)
  },
}

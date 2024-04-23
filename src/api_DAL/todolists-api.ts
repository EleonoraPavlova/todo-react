import { instance } from 'api_DAL'
import { Todolist } from 'common/types'
//один файл должен отвечать за что то одно!!!!! принцип единой ответсвенности - single responsibility

type ResponseTodolist<Data = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: string[]
  data: Data
}

export const todolistsApi = {
  getTodoslists() {
    return instance.get<Todolist[]>('todo-lists')
  },

  createTodoslist(title: string) {
    return instance.post<ResponseTodolist<{ item: Todolist }>>('/todo-lists', {
      title: title,
    })
  },

  deleteTodoslist(todoListId: string) {
    return instance.delete<ResponseTodolist>(`todo-lists/${todoListId}`)
  },

  updateTodoslist(todoListId: string, title: string) {
    return instance.put<ResponseTodolist>(`todo-lists/${todoListId}`, {
      title: title,
    })
  },
}

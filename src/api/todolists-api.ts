import { instance } from 'api'
import { ResponseData, Todolist } from 'common/types'
//один файл должен отвечать за что то одно!!!!! принцип единой ответсвенности - single responsibility

export const todolistsApi = {
  getTodoslists() {
    return instance.get<Todolist[]>('todo-lists')
  },

  createTodoslist(title: string) {
    return instance.post<ResponseData<{ item: Todolist }>>('/todo-lists', {
      title: title,
    })
  },

  deleteTodoslist(todoListId: string) {
    return instance.delete<ResponseData>(`todo-lists/${todoListId}`)
  },

  updateTodoslist(todoListId: string, title: string) {
    return instance.put<ResponseData>(`todo-lists/${todoListId}`, {
      title: title,
    })
  },
}

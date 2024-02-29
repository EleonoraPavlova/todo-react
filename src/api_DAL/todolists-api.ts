import axios from 'axios'
//axios под капотом ts!
//один файл должен отвечать за что то одно!!!!! принцип единой ответсвенности - single responsibility

export const settings = {
  withCredentials: true, //есть валидац токен
  headers: {
    'API-KEY': 'da75ba21-ff7d-45de-8bae-e8c163a0a2e8',
  },
}

export const instanse = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  ...settings,
})

export type TodolistTypeApi = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type ResponseTodolistType<Data = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: string[]
  data: Data
}

export const todolistsApi = {
  getTodoslists() {
    return instanse.get<TodolistTypeApi[]>('todo-lists')
  },

  createTodoslist(title: string) {
    return instanse.post<ResponseTodolistType<{ item: TodolistTypeApi }>>('/todo-lists', {
      title: title,
    })
  },

  deleteTodoslist(todoListId: string) {
    return instanse.delete<ResponseTodolistType>(`todo-lists/${todoListId}`)
  },

  updateTodoslist(todoListId: string, title: string) {
    return instanse.put<ResponseTodolistType>(`todo-lists/${todoListId}`, {
      title: title,
    })
  },
}

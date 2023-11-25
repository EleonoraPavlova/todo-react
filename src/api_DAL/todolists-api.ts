import axios from 'axios'
//axios под капотом ts!
//один файл должен отвечать за что то одно!!!!! принцип единой ответсвенности - single responsibility

export const settings = {
  withCredentials: true, //есть валидац токен
  headers: {
    "API-KEY": "6a891b51-a742-4c47-8da1-58a8df99feb7"
  }
}

export const instanse = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings
})

export type TodolistTypeApi = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type ResponseType<Data = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: string[]
  data: Data
}


export const todolistsApi = {
  getTodoslists() {
    return instanse.get<TodolistTypeApi[]>("todo-lists")
  },

  createTodoslist(title: string) {
    return instanse.post<ResponseType<{ item: TodolistTypeApi }>>("/todo-lists", {
      title: title
    })
  },

  deleteTodoslist(todolistId: string) {
    return instanse.delete<ResponseType>(`todo-lists/${todolistId}`)
  },

  updateTodoslist(todolistId: string, title: string) {
    return instanse.put<ResponseType>(`todo-lists/${todolistId}`, {
      title: title
    })
  }
}
import axios from "axios"

const settings = {
  withCredentials: true, //есть валидац токен
  headers: {
    "API-KEY": "6a891b51-a742-4c47-8da1-58a8df99feb7"
  }
}

export type TodolistTypeApi = {
  id: string
  title: string
  addedDate: string
  order: number
}

// type CreateTodolistResponseType = {
//   resultCode: number
//   messages: string[]
//   fieldsErrors: string[]
//   data: {
//     item: TodolistTypeApi
//   }
// }

// type DeleteUpdateTodolistResponseType = {
//   resultCode: number
//   messages: string[]
//   fieldsErrors: string[]
//   data: {}
// }

export type ResponseType<Data> = {
  resultCode: number
  messages: string[]
  fieldsErrors: string[]
  data: Data
}


export const todolistsApi = {
  getTodoslists() {
    let promise = axios.get<TodolistTypeApi[]>("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
    return promise
  },

  createTodoslists(title: string) {
    let promise = axios.post<ResponseType<{ item: TodolistTypeApi }>>("https://social-network.samuraijs.com/api/1.1/todo-lists", {
      title: title
    }, settings)
    return promise
  },

  deleteTodoslists(todolistId: string) {
    let promise = axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
      settings)
    return promise
  },

  updateTodoslists(todolistId: string, title: string) {
    let promise = axios.put<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {
      title: title
    }, settings)
    return promise
  }
}
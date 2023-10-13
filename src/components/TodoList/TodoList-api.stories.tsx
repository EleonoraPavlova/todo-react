import axios from "axios"
import React, { useEffect, useState } from 'react'

export default {
  title: 'API'
}

const settings = {
  withCredentials: true, //есть валидац токен
  headers: {
    "API-KEY": "6a891b51-a742-4c47-8da1-58a8df99feb7"
  }
}

//GET
export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    let promise = axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)

    promise.then((res) => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

//POST
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {
      title: "Added todolist"
    }, settings).then((res) => {
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}


export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    let todolistId = "9e546a4a-f569-4da9-8f88-9cca655fd4e8"
    axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
      settings).then((res) => {
        setState(res.data)
      })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}


export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    let todolistId = "0314cda3-e041-4094-b05d-c43ba5a52799"
    axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {
      title: "ooops!!"
    }, settings).then((res) => {
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}



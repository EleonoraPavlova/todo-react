import axios from "axios"
import React, { useEffect, useState } from 'react'
import { todolistsApi } from "../../api/todolists-api"

export default {
  title: 'API'
}

//GET
export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistsApi.getTodoslists().then((res) => {
      setState(res.data[1].id)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

//POST
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    todolistsApi.createTodoslists("something").then((res) => {
      setState(res.data.messages)
      debugger
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}


export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    let todolistId = "35587a64-7e7b-48f1-a193-67bb919dd002"
    todolistsApi.deleteTodoslists(todolistId).then((res) => {
      setState(res.data.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}


export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    let todolistId = "0314cda3-e041-4094-b05d-c43ba5a52799"
    todolistsApi.updateTodoslists(todolistId, "update").then((res) => {
      setState(res.data.messages)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}



import React, { useEffect, useState } from 'react'
import { todolistsApi } from "../../api/todolists-api"

export default {
  title: 'API/todolists'
}

//GET
export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    todolistsApi.getTodoslists().then((res) => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

//POST
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    todolistsApi.createTodoslists("something").then((res) => {
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}


export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>("")

  const deleteTodolist = () => {
    todolistsApi.deleteTodoslists(todolistId).then((res) => {
      setState(res.data.data)
      setTodolistId("")
      setState("todolist deleted successfully")
    })
  }

  return (<>
    <div> {JSON.stringify(state)}</div>
    <div style={{ display: "flex", gap: "15px", flexDirection: "column", width: "250px", margin: "20px" }}>
      <input value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
        placeholder="todolistId to be deleted" />
      <button style={{ width: "70px", padding: "6px" }}
        onClick={deleteTodolist}
        disabled={!todolistId}
      >delete todolist</button>
    </div>
  </>)
}


export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState<string>("")
  const [todolistId, setTodolistId] = useState<string>("")

  // useEffect(() => {
  //   todolistsApi.updateTodoslistsTitle(todolistId, "update").then((res) => {
  //     setState(res.data.messages)
  //   })
  // }, [])

  const updateTodolist = () => {
    todolistsApi.updateTodoslistsTitle(todolistId, title).then((res) => {
      setState(res.data.data)
      setTodolistId("")
      setTitle("")
      setState("todolist updated successfully")
    })
  }


  return (<>
    <div> {JSON.stringify(state)}</div>
    <div style={{ display: "flex", gap: "15px", flexDirection: "column", width: "250px", margin: "20px" }}>
      <input value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
        placeholder="todolistId to be update" />
      <input value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        placeholder="new title" />
      <button style={{ width: "70px", padding: "6px" }}
        onClick={updateTodolist}
        disabled={!todolistId}
      >update todolist title</button>
    </div>
  </>)
}
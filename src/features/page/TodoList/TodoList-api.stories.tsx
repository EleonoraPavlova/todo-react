import React, { useEffect, useState } from 'react'
import { todolistsApi } from '../../../api/todolists-api'

export default {
  title: 'API/todolists',
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
    todolistsApi.createTodoslist('something').then((res) => {
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todoListId, setTodolistId] = useState<string>('')

  const deleteTodolist = () => {
    todolistsApi.deleteTodoslist(todoListId).then((res) => {
      setState(res.data.data)
      setTodolistId('')
      setState('todolist deleted successfully')
    })
  }

  return (
    <>
      <div> {JSON.stringify(state)}</div>
      <div
        style={{
          display: 'flex',
          gap: '15px',
          flexDirection: 'column',
          width: '250px',
          margin: '20px',
        }}>
        <input
          value={todoListId}
          onChange={(e) => setTodolistId(e.currentTarget.value)}
          placeholder="todoListId to be deleted"
        />
        <button style={{ width: '70px', padding: '6px' }} onClick={deleteTodolist} disabled={!todoListId}>
          delete todolist
        </button>
      </div>
    </>
  )
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState<string>('')
  const [todoListId, setTodolistId] = useState<string>('')

  // useEffect(() => {
  //   todolistsApi.updateTodoslistsTitle(todoListId, "update").then((res) => {
  //     setState(res.data.messages)
  //   })
  // }, [])

  const updateTodolist = () => {
    todolistsApi.updateTodoslist(todoListId, title).then((res) => {
      setState(res.data.data)
      setTodolistId('')
      setTitle('')
      setState('todolist updated successfully')
    })
  }

  return (
    <>
      <div> {JSON.stringify(state)}</div>
      <div
        style={{
          display: 'flex',
          gap: '15px',
          flexDirection: 'column',
          width: '250px',
          margin: '20px',
        }}>
        <input
          value={todoListId}
          onChange={(e) => setTodolistId(e.currentTarget.value)}
          placeholder="todoListId to be update"
        />
        <input value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder="new title" />
        <button style={{ width: '70px', padding: '6px' }} onClick={updateTodolist} disabled={!todoListId}>
          update todolist title
        </button>
      </div>
    </>
  )
}

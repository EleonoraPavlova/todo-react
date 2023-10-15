import React, { useEffect, useState } from 'react'
import { tasksApi } from "../../api/tasks-api"
import { TaskForMap } from "./TaskForMap"

export default {
  title: 'API/tasks',
  component: TaskForMap,
  decorators: [
    (Story: any) => (
      <div style={{ padding: "20px" }} >
        <Story />
      </div >
    ),
  ],
}


//GET
export const GetTasks = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    let todolistId = "0314cda3-e041-4094-b05d-c43ba5a52799"
    tasksApi.getTasks(todolistId).then((res) => {
      setState(res.data.items)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

//POST
export const CreateTasks = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState<string>('')
  const [todolistId, setTodolistId] = useState<string>("")

  const createTask = () => {
    tasksApi.createTasks(title, todolistId).then((res) => {
      setState(res.data.data.item)
    })
  }
  return <div style={{ display: "flex", gap: "15px", flexDirection: "column", width: "250px" }}>{JSON.stringify(state)}
    <input value={title}
      onChange={(e) => setTitle(e.currentTarget.value)}
      placeholder="title for new task" />
    <input value={todolistId}
      onChange={(e) => setTodolistId(e.currentTarget.value)}
      placeholder="todolistId" />
    <button style={{ width: "70px", padding: "6px" }} onClick={createTask} disabled={!title || !todolistId}>create task</button>
  </div>
}


export const DeleteTasks = () => {
  const [state, setState] = useState<any>(null)
  const [taskId, setTaskId] = useState<string>('')
  const [todolistId, setTodolistId] = useState<string>("")

  const deleteTask = () => {
    tasksApi.deleteTasks(todolistId, taskId).then((res) => {
      // const foundTaskId = res.data

      setState(res.data)
      debugger
    })
  }

  return <div style={{ display: "flex", gap: "15px", flexDirection: "column", width: "250px" }}>{JSON.stringify(state)}
    <input value={taskId}
      onChange={(e) => setTaskId(e.currentTarget.value)}
      placeholder="id task" />
    <input value={todolistId}
      onChange={(e) => setTodolistId(e.currentTarget.value)}
      placeholder="todolistId" />
    <button style={{ width: "70px", padding: "6px" }}
      onClick={deleteTask}
      disabled={!taskId || !todolistId}
    >delete task</button>
  </div>
}


export const UpdateTasksTitle = () => {
  const [state, setState] = useState<any>(null)
  const [taskId, setTaskId] = useState<string>('')
  const [todolistId, setTodolistId] = useState<string>("")
  const [title, setTitle] = useState<string>("")


  const updateTask = () => {
    tasksApi.updateTasks(todolistId, taskId, title).then((res) => {
      setState(res.data.data)
    })
  }

  return <div style={{ display: "flex", gap: "15px", flexDirection: "column", width: "250px" }}>{JSON.stringify(state)}
    <input value={taskId}
      onChange={(e) => setTaskId(e.currentTarget.value)}
      placeholder="id task" />
    <input value={todolistId}
      onChange={(e) => setTodolistId(e.currentTarget.value)}
      placeholder="todolistId" />
    <input value={title}
      onChange={(e) => setTitle(e.currentTarget.value)}
      placeholder="title for a task" />
    <button style={{ width: "70px", padding: "6px" }} onClick={updateTask}>delete task</button>
  </div>
}
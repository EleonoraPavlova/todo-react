import React, { useState } from 'react'
import { tasksApi } from '../../api_DAL/tasks-api'
import { TaskMap } from './TaskMap'
import { UpdateTaskParams } from 'common/types'

export default {
  title: 'API/tasks',
  component: TaskMap,
  decorators: [
    (Story: any) => (
      <div style={{ padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
}

//GET
export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todoListId, setTodolistId] = useState<string>('')

  const getTask = () => {
    tasksApi.getTasks(todoListId).then((res) => {
      setState(res.data.items)
      setTodolistId('')
    })
  }

  return (
    <>
      <div>{JSON.stringify(state)}</div>
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
          placeholder="todoListId куда ложить таску"
        />
        <button style={{ width: '70px', padding: '6px' }} onClick={getTask} disabled={!todoListId}>
          get task
        </button>
      </div>
    </>
  )
}

//POST
export const CreateTasks = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState<string>('')
  const [todoListId, setTodolistId] = useState<string>('')

  const createTask = () => {
    tasksApi.createTask({ title, todoListId }).then((res) => {
      setState(res.data.data.item)
      setTitle('')
      setTodolistId('')
    })
  }
  return (
    <div style={{ display: 'flex', gap: '15px', flexDirection: 'column', width: '250px' }}>
      {JSON.stringify(state)}
      <input value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder="title for new task" />
      <input value={todoListId} onChange={(e) => setTodolistId(e.currentTarget.value)} placeholder="todoListId" />
      <button style={{ width: '70px', padding: '6px' }} onClick={createTask} disabled={!title || !todoListId}>
        create task
      </button>
    </div>
  )
}

export const DeleteTasks = () => {
  const [state, setState] = useState<any>(null)
  const [taskId, setTaskId] = useState<string>('')
  const [todoListId, setTodolistId] = useState<string>('')

  const deleteTask = () => {
    tasksApi.deleteTask({ todoListId, taskId }).then((res) => {
      setState(res.data)
      setTaskId('')
      setTodolistId('')
      setState('task deleted successfully')
    })
  }

  return (
    <div style={{ display: 'flex', gap: '15px', flexDirection: 'column', width: '250px' }}>
      {JSON.stringify(state)}
      <input value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)} placeholder="id task" />
      <input value={todoListId} onChange={(e) => setTodolistId(e.currentTarget.value)} placeholder="todoListId" />
      <button style={{ width: '70px', padding: '6px' }} onClick={deleteTask} disabled={!taskId || !todoListId}>
        delete task
      </button>
    </div>
  )
}

//PUT
export const UpdateTasksTitle = () => {
  const [state, setState] = useState<any>(null)
  const [taskId, setTaskId] = useState<string>('')
  const [todoListId, setTodolistId] = useState<string>('')
  const [title, setTitle] = useState<string>('')

  const updateTask = () => {
    tasksApi.updateTaskTitle(todoListId, taskId, title).then((res) => {
      setState(res.data.data)
    })
  }

  return (
    <div style={{ display: 'flex', gap: '15px', flexDirection: 'column', width: '250px' }}>
      {JSON.stringify(state)}
      <input value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)} placeholder="id task" />
      <input value={todoListId} onChange={(e) => setTodolistId(e.currentTarget.value)} placeholder="todoListId" />
      <input value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder="title for a task" />
      <button style={{ width: '70px', padding: '6px' }} onClick={updateTask}>
        update task title
      </button>
    </div>
  )
}

export const UpdateTaskAtAll = () => {
  const [state, setState] = useState<any>(null)
  //все значения взяла из типа: export type UpdateTaskModel = { //какие поля можно обновить в tasks
  const [status, setStatus] = useState<number>(0)
  const [priority, setPriority] = useState<number>(0)
  const [taskId, setTaskId] = useState<string>('')
  const [todoListId, setTodolistId] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [deadline, setDeadline] = useState<string>('')

  const updateTask = () => {
    const model: UpdateTaskParams = {
      todoListId: '',
      taskId: '',
      domainModel: {
        deadline: '',
        description: description,
        title: title,
        priority: priority,
        startDate: '',
        status: status,
      },
    }
    tasksApi.updateTaskAtAll(model).then((res) => {
      setState(res.data.data)
      setTaskId('')
      setTodolistId('')
      setTitle('')
      setPriority(0)
      setDescription('')
      setStatus(0)
      setStartDate('')
      setDeadline('')
    })
  }

  return (
    <div style={{ display: 'flex', gap: '15px', flexDirection: 'column', width: '250px' }}>
      {JSON.stringify(state)}
      <input value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)} placeholder="id task" />
      <input value={todoListId} onChange={(e) => setTodolistId(e.currentTarget.value)} placeholder="todoListId" />
      <input value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder="title for a task" />
      <input value={priority} onChange={(e) => setPriority(Number(e.currentTarget.value))} placeholder="priority" />
      <input value={description} onChange={(e) => setDescription(e.currentTarget.value)} placeholder="description" />
      <input
        value={status}
        type="number"
        onChange={(e) => setStatus(Number(e.currentTarget.value))}
        placeholder="status"
      />
      <input value={startDate} onChange={(e) => setStartDate(e.currentTarget.value)} placeholder="startDate" />
      <input value={deadline} onChange={(e) => setDeadline(e.currentTarget.value)} placeholder="deadline" />
      <button style={{ width: '70px', padding: '6px' }} onClick={updateTask}>
        update task
      </button>
    </div>
  )
}

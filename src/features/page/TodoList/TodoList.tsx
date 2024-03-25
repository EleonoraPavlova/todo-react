import React, { memo } from 'react'
import { Box, Button, IconButton, List } from '@mui/material'
import { AddItemForm } from '../../../components/AddItemForm'
import { Delete } from '@mui/icons-material'
import { EditableSpan } from '../../../components/EditableSpan'
import s from './TodoList.module.scss'
import { TodolistDomain } from 'reducers/todolistsSlice'
import { useTodoList } from './hooks/useTodoList'
import { TaskMap } from 'components/TaskMap'
import { Task } from 'common/types'

type TodoListProps = {
  todolist: TodolistDomain
  tasksForTodolist: Task[]
  demo: boolean //загрузка мокового state
}

export const TodoList: React.FC<TodoListProps> = memo(({ demo = false, todolist, tasksForTodolist }) => {
  const { entityStatus } = todolist
  const {
    changeFilterAll,
    changeFilterActive,
    changeFilterCompleted,
    changeTodolistTitle,
    addTask,
    removeTodolist,
    filter,
    title,
  } = useTodoList(todolist)

  let disabledFor = entityStatus === 'loading'

  const mappedTasks = () => {
    return tasksForTodolist.map((task) => <TaskMap key={task.id} task={task} />)
  }

  return (
    <div className={s.todolist}>
      <Box
        component={'div'}
        sx={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <EditableSpan
          value={title}
          onChange={changeTodolistTitle}
          additionalClass={s.additionalClass}
          disabled={disabledFor}
        />
        <IconButton aria-label="delete" size="small" disabled={disabledFor} onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </Box>
      <AddItemForm addTask={addTask} disabled={disabledFor} />
      <List>{mappedTasks()}</List>
      <div style={{ display: 'flex', gap: '15px' }}>
        <Button
          size="small"
          variant={filter === 'all' ? 'contained' : 'text'}
          children={'All'}
          disabled={disabledFor}
          onClick={changeFilterAll}
          className="button"
        />
        <Button
          size="small"
          color={'success'}
          variant={filter === 'active' ? 'contained' : 'text'}
          children={'Active'}
          disabled={disabledFor}
          onClick={changeFilterActive}
          className="button"
        />
        <Button
          size="small"
          color={'secondary'}
          variant={filter === 'completed' ? 'contained' : 'text'}
          disabled={disabledFor}
          children={'Completed'}
          onClick={changeFilterCompleted}
          className="button"
        />
      </div>
    </div>
  )
})

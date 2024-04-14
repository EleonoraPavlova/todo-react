import React, { memo } from 'react'
import { Box, IconButton, List } from '@mui/material'
import { AddItemForm } from '../../../components/AddItemForm'
import { Delete } from '@mui/icons-material'
import { EditableSpan } from '../../../components/EditableSpan'
import s from './TodoList.module.scss'
import { TodolistDomain } from 'BLL/reducers/todolistsSlice'
import { useTodoList } from './hooks/useTodoList'
import { TaskMap } from 'components/TaskMap'
import { Task } from 'common/types'
import { Buttons } from 'components/Buttons'

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
    if (tasksForTodolist.length) {
      return tasksForTodolist.map((task) => <TaskMap key={task.id} task={task} />)
    } else {
      return <h5 style={{ textAlign: 'center' }}>No tasks yet</h5>
    }
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
          width: '100%',
          padding: '0px',
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
      <Box sx={{ margin: '0 auto' }}>
        <AddItemForm addTask={addTask} disabled={disabledFor} />
        <List>{mappedTasks()}</List>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Buttons
            filter={filter}
            changeFilterAll={changeFilterAll}
            changeFilterActive={changeFilterActive}
            changeFilterCompleted={changeFilterCompleted}
          />
        </div>
      </Box>
    </div>
  )
})

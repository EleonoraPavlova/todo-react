import React, { memo, useCallback } from 'react'
import { Box, List } from '@mui/material'
import { AddItemForm } from 'components/AddItemForm'
import s from './TodoList.module.scss'
import { TaskMap } from 'components/TaskMap'
import { Task, TodolistDomain } from 'common/types'
import { Buttons } from 'components/Buttons'
import { TodoListTitle } from 'components/TodolistTitle/TodolistTitle'
import { useActions } from 'common/hooks'
import { tasksThunks } from 'BLL/reducers/tasksSlice'
import { Tasks } from 'components/Tasks/Tasks'

type Props = {
  todolist: TodolistDomain
  tasksForTodolist: Task[]
  demo: boolean //загрузка мокового state
}

export const TodoList: React.FC<Props> = memo(({ demo = false, todolist, tasksForTodolist }) => {
  const { entityStatus, id, filter, title } = todolist
  const { addTaskTC } = useActions(tasksThunks)
  let disabledFor = entityStatus === 'loading'

  const addTask = useCallback(
    (title: string) => {
      return addTaskTC({ title, todoListId: id }).unwrap()
    },
    [addTaskTC, id]
  )

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
        <TodoListTitle disabledFor={disabledFor} todolist={todolist} />
      </Box>
      <Box sx={{ margin: '0 auto' }}>
        <AddItemForm addTask={addTask} disabled={disabledFor} label={'Type here...'} />
        <Tasks tasksForTodolist={tasksForTodolist} />
        <Box sx={{ display: 'flex', gap: '15px' }}>
          <Buttons todolist={todolist} />
        </Box>
      </Box>
    </div>
  )
})

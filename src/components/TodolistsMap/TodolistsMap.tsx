import React from 'react'
import { Box, Paper } from '@mui/material'
import { Task } from 'common/types'
import { TaskStatuses } from 'common/enums'
import { useSelector } from 'react-redux'
import { tasksSelector } from 'BLL/reducers/tasksSlice'
import { selectTodolists } from 'BLL/reducers/todolistsSlice'
import { TodoList } from 'features/page/TodoList'

export const TodolistsMap = () => {
  const todolists = useSelector(selectTodolists) //выбираем todolist из стора state
  //TodoListsType[]> означает хотим достать массив todolists из этого типа
  const tasks = useSelector(tasksSelector)

  const todolistsMap = todolists.map((l) => {
    let tasksForTodolist = tasks[l.id] as Task[]
    if (l.filter === 'completed') {
      tasksForTodolist = tasks[l.id].filter((t: Task) => t.status === TaskStatuses.Completed)
    }
    if (l.filter === 'active') {
      tasksForTodolist = tasks[l.id].filter((t: Task) => t.status === TaskStatuses.New)
    }

    return (
      <Box key={l.id} sx={{ padding: '19px 15px 0 0' }}>
        <Paper sx={{ padding: '18px', width: '240px' }} elevation={1}>
          <TodoList todolist={l} demo={false} tasksForTodolist={tasksForTodolist} />
        </Paper>
      </Box>
    )
  })

  return <React.Fragment>{todolistsMap}</React.Fragment>
}

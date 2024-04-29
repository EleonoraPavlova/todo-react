import React, { memo } from 'react'
import { Box, Button } from '@mui/material'
import { FilterValues, TodolistDomain } from 'common/types'
import { useActions } from 'common/hooks'
import { todolistsThunks } from 'BLL/reducers/todolistsSlice'

type Props = {
  todolist: TodolistDomain
}

export const Buttons: React.FC<Props> = memo(({ todolist }) => {
  const { filter, title, id } = todolist
  const { updateTodolistTC } = useActions(todolistsThunks)

  const changeTodoListFilter = (todoListId: string, filter: FilterValues) => {
    updateTodolistTC({ todoListId, title, filter })
  }

  return (
    <Box sx={{ display: 'flex', gap: '10px' }}>
      <Button
        size="small"
        variant={filter === 'all' ? 'contained' : 'text'}
        children={'All'}
        onClick={() => changeTodoListFilter(id, 'all')}
      />
      <Button
        size="small"
        color={'primary'}
        variant={filter === 'active' ? 'contained' : 'text'}
        children={'Active'}
        onClick={() => changeTodoListFilter(id, 'active')}
      />
      <Button
        size="small"
        color={'secondary'}
        variant={filter === 'completed' ? 'contained' : 'text'}
        children={'Completed'}
        onClick={() => changeTodoListFilter(id, 'completed')}
      />
    </Box>
  )
})

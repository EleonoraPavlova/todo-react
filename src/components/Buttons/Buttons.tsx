import React, { memo } from 'react'
import { Box, Button } from '@mui/material'
import { FilterValues } from 'common/types'

type ButtonsProps = {
  filter: FilterValues
  changeFilterAll: () => void
  changeFilterActive: () => void
  changeFilterCompleted: () => void
}

export const Buttons: React.FC<ButtonsProps> = memo(
  ({ changeFilterAll, changeFilterActive, changeFilterCompleted, filter }) => {
    return (
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Button
          size="small"
          variant={filter === 'all' ? 'contained' : 'text'}
          children={'All'}
          onClick={changeFilterAll}
          className="button"
        />
        <Button
          size="small"
          color={'primary'}
          variant={filter === 'active' ? 'contained' : 'text'}
          children={'Active'}
          onClick={changeFilterActive}
          className="button"
        />
        <Button
          size="small"
          color={'secondary'}
          variant={filter === 'completed' ? 'contained' : 'text'}
          children={'Completed'}
          onClick={changeFilterCompleted}
          className="button"
        />
      </Box>
    )
  }
)

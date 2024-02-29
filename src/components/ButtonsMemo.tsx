import React, { memo } from 'react'
import { Button } from '@mui/material'
import { FilterValuesType } from '../state/todolists/todolistsSlice'

type ButtonsMemoType = {
  filter: FilterValuesType
  id: string
  changeFilterHandler: (filter: FilterValuesType, togoListId: string) => void
}

export const ButtonsMemo: React.FC<ButtonsMemoType> = memo(
  ({ changeFilterHandler, filter, id }: ButtonsMemoType) => {
    console.log('ButtonsMemo has been called')

    return (
      <div>
        <Button
          size="small"
          variant={filter === 'all' ? 'contained' : 'text'}
          children={'All'}
          onClick={() => {
            changeFilterHandler('all', id)
          }}
          className="button"
        />
        <Button
          size="small"
          color={'primary'}
          variant={filter === 'active' ? 'contained' : 'text'}
          children={'Active'}
          onClick={() => {
            changeFilterHandler('active', id)
          }}
          className="button"
        />
        <Button
          size="small"
          color={'secondary'}
          variant={filter === 'completed' ? 'contained' : 'text'}
          children={'Completed'}
          onClick={() => {
            changeFilterHandler('completed', id)
          }}
          className="button"
        />
      </div>
    )
  }
)

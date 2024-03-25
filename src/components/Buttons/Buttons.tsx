import React, { memo } from 'react'
import { Button } from '@mui/material'
import { FilterValues } from 'common/types'

type ButtonsProps = {
  filter: FilterValues
  id: string
  changeFilterHandler: (filter: FilterValues, togoListId: string) => void
}

export const Buttons: React.FC<ButtonsProps> = memo(({ changeFilterHandler, filter, id }: ButtonsProps) => {
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
})

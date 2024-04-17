import React, { memo, useCallback } from 'react'
import { IconButton, TextField } from '@mui/material'
import styled from './AddItemForm.module.scss'
import AddTaskIcon from '@mui/icons-material/AddTask'
import { useAddItemForm } from './hooks/useAddItemForm'

type AddItemFormProps = {
  disabled?: boolean
  label: string
  addTask: (inputValue: string) => void //надо обвернуть в useCallback каждый пропс-функц через всю цепочку!!!!!
  //в данном случае в 2 местах
}

//вся мемоизация работает в паре с React.memo(давать просто каждой компрненте, если есть callback)
export const AddItemForm: React.FC<AddItemFormProps> = memo(({ disabled = false, label, addTask }) => {
  const { error, inputValue, onChangeHandler, onKeyDownHandler, addItemHandler, setError } = useAddItemForm(addTask)

  const onBlurHandler = useCallback(() => {
    setError(null)
  }, [inputValue])

  return (
    <div className={styled.addItemForm}>
      <TextField
        type="text"
        label={label}
        value={inputValue}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        onKeyDown={onKeyDownHandler}
        variant={'outlined'}
        error={!!error}
        helperText={error}
        size="small"
      />
      <IconButton onClick={() => addItemHandler(inputValue)}>
        <AddTaskIcon fontSize="small" color="success" />
      </IconButton>
    </div>
  )
})

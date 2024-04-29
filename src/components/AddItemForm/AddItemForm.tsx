import React from 'react'
import { IconButton, TextField } from '@mui/material'
import styled from './AddItemForm.module.scss'
import AddTaskIcon from '@mui/icons-material/AddTask'
import { useAddItemForm } from './hooks/useAddItemForm'

type Props = {
  disabled?: boolean
  label: string
  addTask: (inputValue: string) => Promise<any>
}

//вся мемоизация работает в паре с React.memo(давать просто каждой компрненте, если есть callback)
export const AddItemForm: React.FC<Props> = ({ disabled = false, label, addTask }) => {
  const { error, inputValue, onChangeHandler, onKeyDownHandler, addItemHandler, setError } = useAddItemForm(addTask)

  const setErrorBlurHandler = () => {
    setError(null)
  }

  return (
    <div className={styled.addItemForm}>
      <TextField
        type="text"
        label={label}
        value={inputValue}
        onChange={onChangeHandler}
        onBlur={setErrorBlurHandler}
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
}

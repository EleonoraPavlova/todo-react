import React, { ChangeEvent, KeyboardEvent, memo, useState } from 'react'
//import { ButtonComponent } from "../ButtonComponent/ButtonComponent";
import { IconButton, TextField } from '@mui/material'
import styled from './AddItemForm.module.scss'
import AddTaskIcon from '@mui/icons-material/AddTask'

type AddItemFormType = {
  disabled?: boolean
  addTask: (inputValue: string) => void //надо обвернуть в useCallback каждый пропс-функц через всю цепочку!!!!!!!!!!
  //в данном случае в 2 местах
}

//вся мемоизация работает в паре с React.memo(давать просто каждой компрненте)
export const AddItemForm: React.FC<AddItemFormType> = memo(
  ({ disabled = false, addTask }: AddItemFormType) => {
    console.log('AddItemForm')

    let [error, setError] = useState<string | null>(null)
    let [inputValue, setInputValue] = useState<string>('')

    const addItemHandler = (taskName: string) => {
      if (/[a-zа-яё]/i.test(taskName)) {
        addTask(taskName)
        setInputValue('')
      } else {
        setError('Required')
      }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.currentTarget.value) //тот элемент с которым произошло событие
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (error !== null) setError(null)
      if (e.key === 'Enter') addItemHandler(inputValue)
    }

    return (
      <div className={styled.addItemForm}>
        <TextField
          type="text"
          label="Type here...."
          value={inputValue}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
          variant={'outlined'}
          error={!!error}
          helperText={error}
          size="small"
          disabled={disabled}
        />

        <IconButton onClick={() => addItemHandler(inputValue)} disabled={disabled}>
          <AddTaskIcon fontSize="small" color={disabled ? 'disabled' : 'success'} />
        </IconButton>
      </div>
    )
  }
)

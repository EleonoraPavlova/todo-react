import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
//import { ButtonComponent } from "../ButtonComponent/ButtonComponent";
import { Button, IconButton, TextField } from "@mui/material";
import styled from "./AddItemForm.module.scss"
import AddTaskIcon from '@mui/icons-material/AddTask';



type AddItemFormType = {
  addTask: (inputValue: string) => void
}

export const AddItemForm: React.FC<AddItemFormType> = ({ addTask }: AddItemFormType) => {
  let [error, setError] = useState<string | null>(null)
  let [inputValue, setInputValue] = useState("")


  const addItemHandler = (taskName: string) => {
    if (/[a-zа-яё]/i.test(taskName)) {
      addTask(taskName);
      setInputValue("");
    } else {
      setError('Required')
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value); //тот элемент с которым произошло событие
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      addItemHandler(inputValue)
    }
  }

  return (
    <div className={styled.addItemForm}>
      <TextField type="text" label="Type here...."
        value={inputValue}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        variant={"outlined"}
        error={!!error}
        helperText={error}
        size="small"
      />
      {/* <ButtonComponent name="Add" callBack={() => addItemHandler(inputValue)} /> */}

      <IconButton
        onClick={() => addItemHandler(inputValue)}>
        <AddTaskIcon fontSize="small" color="success" />
      </IconButton>
      {/* {error && <div className={styled.errorMes}>{error}</div>} */}
    </div >
  )
}


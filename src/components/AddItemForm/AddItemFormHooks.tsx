import React, { ChangeEvent, KeyboardEvent, memo, useState } from 'react';
//import { ButtonComponent } from "../ButtonComponent/ButtonComponent";
import { IconButton, TextField } from "@mui/material";
import styled from "./AddItemForm.module.scss"
import AddTaskIcon from '@mui/icons-material/AddTask';
import { useAddItemForm } from "./hooks/useAddItemForm";



type AddItemFormType = {
  addTask: (inputValue: string) => void //надо обвернуть в useCallback каждый пропс-функц через всю цепочку!!!!!!!!!!
  //в данном случае в 2 местах
}

//вся мемоизация работает в паре с React.memo(давать просто каждой компрненте)
export const AddItemForm: React.FC<AddItemFormType> = memo(({ addTask }: AddItemFormType) => {
  console.log("AddItemForm")

  const { error, inputValue, onChangeHandler, onKeyDownHandler, addItemHandler } = useAddItemForm(addTask)

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
})


import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { ButtonComponent } from "../ButtonComponent/ButtonComponent";
import style from "./../TodoList/TodoList.module.scss"


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
      addTask(e.currentTarget.value);
    }
  }

  return (
    <div>
      <input type="text" placeholder="Type here...."
        value={inputValue}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        className={error ? "error" : ""}
      />
      <ButtonComponent name="Add" callBack={() => addItemHandler(inputValue)} />
      {error && <div className={style.errorMes}>{error}</div>}
    </div>
  )
}
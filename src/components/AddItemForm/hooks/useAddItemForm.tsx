import React, { ChangeEvent, useState, KeyboardEvent } from "react";


export function useAddItemForm(addTask: (taskName: string) => void) {

  let [error, setError] = useState<string | null>(null)
  let [inputValue, setInputValue] = useState<string>("")


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
    if (error !== null) setError(null);
    if (e.key === "Enter") addItemHandler(inputValue)
  }
  return { error, inputValue, onChangeHandler, onKeyDownHandler, addItemHandler }
}
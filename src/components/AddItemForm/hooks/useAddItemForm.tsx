import React, { ChangeEvent, useState, KeyboardEvent, useCallback } from 'react'

export function useAddItemForm(addTask: (taskName: string) => void) {
  let [error, setError] = useState<string | null>(null)
  let [inputValue, setInputValue] = useState<string>('')

  const addItemHandler = useCallback(
    (taskName: string) => {
      if (/[a-zA-Zа-яА-ЯёЁ0-9]/i.test(taskName) && taskName.length >= 3) {
        if (taskName.length > 100) {
          setInputValue(inputValue)
          setError('max 100 characters')
        } else {
          addTask(taskName)
          setInputValue('')
        }
      } else {
        debugger
        setError('min 3 characters')
      }
    },
    [addTask, setInputValue, setError, inputValue]
  )

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value
      setInputValue(value) //тот элемент с которым произошло событие
      if (value.length > 100) setError('max 100 characters')
    },
    [setInputValue]
  )

  const onKeyDownHandler = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (error !== null) setError(null)
      if (e.key === 'Enter') addItemHandler(inputValue)
    },
    [setError, addItemHandler]
  )

  return { error, inputValue, onChangeHandler, onKeyDownHandler, addItemHandler, setError }
}

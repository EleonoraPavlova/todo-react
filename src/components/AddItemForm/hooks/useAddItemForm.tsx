import React, { ChangeEvent, useState, KeyboardEvent, useCallback } from 'react'

export function useAddItemForm(addTask: (taskName: string) => void) {
  let [error, setError] = useState<string | null>(null)
  let [inputValue, setInputValue] = useState<string>('')

  const addItemHandler = useCallback(
    (taskName: string) => {
      if (/[a-zа-яё]/i.test(taskName) && taskName.length >= 4) {
        if (taskName.length > 100) {
          setInputValue(inputValue)
          setError('max 100 characters')
        } else {
          addTask(taskName)
          setInputValue('')
        }
      } else {
        setError('min 4 characters')
      }
    },
    [addTask, setInputValue, setError, inputValue]
  )

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.currentTarget.value) //тот элемент с которым произошло событие
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

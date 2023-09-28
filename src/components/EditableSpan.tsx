import { Box, TextField } from "@mui/material";
import React, { ChangeEvent, useState, KeyboardEvent, memo } from 'react';


type EditableSpanType = {
  title: string
  onChange: (input: string) => void
}

export const EditableSpan: React.FC<EditableSpanType> = memo(({ title, onChange }: EditableSpanType) => {
  let [editMode, setEditMode] = useState<boolean>(false)
  let [input, setInput] = useState<string>("")

  const activateEditMode = () => {
    setEditMode(true)
    setInput(title)    //установила новое значение таски 
  }
  const activateViewMode = () => {
    setEditMode(false)
    onChange(input) //теперь новое значение таски можно прочитать:
    // c помощью этого колбека сообщить родителю что произошло событие и передать актуальное значение input
  }


  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setInput(e.currentTarget.value)
      setEditMode(false)
      onChange(input)
    }
  }

  return (editMode ?
    <TextField value={input}
      onChange={onChangeTitleHandler}
      onBlur={activateViewMode}
      onKeyDown={onKeyDownHandler}
      autoFocus variant="standard" /> :
    <Box component="span" onDoubleClick={activateEditMode}>{title}</Box>
  )
})

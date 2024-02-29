import React from 'react'
import { AddItemForm } from './AddItemForm'
import { action } from '@storybook/addon-actions'

export default {
  title: 'AddItemForm',
  component: AddItemForm,
}

const callBack = action('Button was pressed') // обязательно для тестирования приходящих колбеков
//покажет содержимое строки

export const AddItemFormBase = () => {
  return <AddItemForm addTask={callBack} />
}

export const AddItemDisable = () => {
  return <AddItemForm addTask={callBack} disabled={true} />
}

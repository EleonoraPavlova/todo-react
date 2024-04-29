import React from 'react'
import { AddItemForm } from './AddItemForm'
import { action } from '@storybook/addon-actions'

export default {
  title: 'AddItemForm',
  component: AddItemForm,
}

const addTask = (inputValue: string) => {
  return new Promise((resolve, reject) => {
    action('addTask')(inputValue) // вызов action
    resolve('resovle')
  })
}

export const AddItemFormBase = () => {
  return <AddItemForm addTask={addTask} label={'Type here...'} />
}

export const AddItemDisable = () => {
  return <AddItemForm addTask={addTask} disabled={true} label={'Type here...'} />
}

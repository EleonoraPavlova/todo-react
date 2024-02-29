import { TodolistDomainType } from '../todolists/todolistsSlice'
import { v1 } from 'uuid'

const todoListId1 = v1()
const todoListId2 = v1()

export const startStateTodolists: TodolistDomainType[] = [
  {
    id: todoListId1,
    title: 'What to learn',
    filter: 'all',
    addedDate: '',
    order: 0,
    entityStatus: 'idle',
  },
  {
    id: todoListId2,
    title: 'What to buy',
    filter: 'all',
    addedDate: '',
    order: 0,
    entityStatus: 'loading', //status сущности
  },
]

import { TodolistTypeApi } from 'api_DAL/todolists-api'
import { RequestStatusType } from '../../reducers/app-reducer/appSlice'
import { startStateTodolists } from '../initialState/todolistsStartState'
import {
  todolistsReducer,
  FilterValuesType,
  changeStatusTodolistAC,
  TodolistDomainType,
  getTodolistTC,
  removeTodolistTC,
  addTodolistTC,
  updateTodolistTC,
} from './todolistsSlice'
import { v1 } from 'uuid'

const todoListId1 = v1()
const todoListId2 = v1()

let todolists: TodolistDomainType[]

beforeEach(() => {})
todolists = [
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

test('correct todolist should be removed', () => {
  const payload = { todoListId: todoListId2 }
  const endState = todolistsReducer(
    todolists,
    removeTodolistTC.fulfilled(payload, 'requestId', todoListId2)
  )

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todoListId1)
})

test('correct todolist should be added', () => {
  const payload: { todolist: TodolistTypeApi } = {
    todolist: {
      id: todoListId1,
      title: 'New',
      addedDate: '',
      order: 0,
    },
  }
  const action = addTodolistTC.fulfilled(payload, 'requestId', payload.todolist.title)
  const endState = todolistsReducer(todolists, action)

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe('New')
  expect(endState[2].filter).toBe('all')
})

test('todolist should be updated', () => {
  let newFilter: FilterValuesType = 'completed'

  const payload = { filter: newFilter, todoListId: todoListId2, title: 'What to buy' }

  const action = updateTodolistTC.fulfilled({ param: payload }, 'requestId', payload)
  const endState = todolistsReducer(todolists, action)

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})

test('todolist should be set to the state', () => {
  const payload = { todolists: startStateTodolists }
  const action = getTodolistTC.fulfilled(payload, 'requestId') //тудолисты брать с сервера!
  const endState = todolistsReducer([], action)

  expect(endState[0].filter).toBe('all')
  expect(endState.length).toBe(2)
})

test('todolist should be set to the entityStatus', () => {
  let newStatus: RequestStatusType = 'succeeded'
  const action = changeStatusTodolistAC({ entityStatus: newStatus, todoListId: todoListId1 })
  const endState = todolistsReducer(todolists, action)

  expect(endState[0].entityStatus).toBe(newStatus)
  expect(startStateTodolists[0].entityStatus).toBe('idle')
})

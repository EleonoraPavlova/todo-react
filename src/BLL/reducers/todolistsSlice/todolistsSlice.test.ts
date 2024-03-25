import {
  todolistsReducer,
  changeStatusTodolistAC,
  TodolistDomain,
  getTodolistTC,
  removeTodolistTC,
  addTodolistTC,
  updateTodolistTC,
} from './todolistsSlice'
import { v1 } from 'uuid'
import { startStateTodolists } from 'moc/initialState/todolistsStartState'
import { FilterValues, RequestStatus, Todolist } from 'common/types'

const todoListId1 = v1()
const todoListId2 = v1()

let todolists: TodolistDomain[]

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
  const endState = todolistsReducer({ todolists }, removeTodolistTC.fulfilled(payload, 'requestId', todoListId2))

  expect(endState.todolists.length).toBe(1)
  expect(endState.todolists[0].id).toBe(todoListId1)
})

test('correct todolist should be added', () => {
  const payload: { todolist: Todolist } = {
    todolist: {
      id: todoListId1,
      title: 'New',
      addedDate: '',
      order: 0,
    },
  }
  const action = addTodolistTC.fulfilled(payload, 'requestId', payload.todolist.title)
  const endState = todolistsReducer({ todolists }, action)

  expect(endState.todolists.length).toBe(3)
  expect(endState.todolists[0].title).toBe('New')
  expect(endState.todolists[2].filter).toBe('all')
})

test('todolist should be updated', () => {
  let newFilter: FilterValues = 'completed'

  const payload = { filter: newFilter, todoListId: todoListId2, title: 'What to buy' }

  const action = updateTodolistTC.fulfilled({ param: payload }, 'requestId', payload)
  const endState = todolistsReducer({ todolists }, action)

  expect(endState.todolists[0].filter).toBe('all')
  expect(endState.todolists[1].filter).toBe(newFilter)
})

test('todolist should be set to the state', () => {
  const action = getTodolistTC.fulfilled(startStateTodolists, 'requestId') //тудолисты брать с сервера!
  const endState = todolistsReducer({ todolists: [] }, action)

  expect(endState.todolists[0].filter).toBe('all')
  expect(endState.todolists.length).toBe(2)
})

test('todolist should be set to the entityStatus', () => {
  let newStatus: RequestStatus = 'succeeded'
  const action = changeStatusTodolistAC({ entityStatus: newStatus, todoListId: todoListId1 })
  const endState = todolistsReducer({ todolists: todolists }, action)

  expect(endState.todolists[0].entityStatus).toBe(newStatus)
  expect(startStateTodolists.todolists[0].entityStatus).toBe('idle')
})

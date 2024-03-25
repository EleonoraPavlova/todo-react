import { TodolistDomain, addTodolistTC, todolistsReducer } from 'reducers/todolistsSlice'
import { tasksReducer } from 'reducers/tasksSlice'
import { Tasks } from 'common/types'

//общий редьюсер для tasks / todolists,
//если нужно генерировать общие значения для state

test('ids should be equals', () => {
  const startTasksState: Tasks = {}
  const startTodolistsState: TodolistDomain[] = []

  const newTodolist = {
    id: '1',
    title: 'What to learn',
    addedDate: '',
    order: 0,
  }
  const action = addTodolistTC.fulfilled({ todolist: newTodolist }, 'requestId', newTodolist.title)

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer({ todolists: startTodolistsState }, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState.todolists[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})

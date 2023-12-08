import { RequestStatusType } from "../app-reducer/app-reducer"
import { todoListId2, todoListId1 } from "../initialState/id-utils"
import { startStateTodolists } from "../initialState/todolistsStartState"
import {
  addTodolistAC,
  changeFilterTodolistAC,
  changeTitleTodolistAC,
  removeTodolistAC,
  todolistsReducer,
  FilterValuesType,
  setTodolistAC,
  changeStatusTodolistAC,
} from './todolists-reducer'


test('correct todolist should be removed', () => {
  const endState = todolistsReducer(startStateTodolists, removeTodolistAC(todoListId2))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todoListId1)
})


test('correct todolist should be added', () => {
  let newTodolistTitle = 'New Todolist'

  const endState = todolistsReducer(startStateTodolists, addTodolistAC({
    id: todoListId1, title: 'What to learn', addedDate: "",
    order: 0
  }))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTodolistTitle)
  expect(endState[2].filter).toBe("all")
})

test('correct todolist should change its name', () => {
  let newTodolistTitle = 'New Todolist'

  const action = changeTitleTodolistAC(newTodolistTitle, todoListId2)
  const endState = todolistsReducer(startStateTodolists, action)

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})


test('correct filter of todolist should be changed', () => {
  let newFilter: FilterValuesType = 'completed'

  const action = changeFilterTodolistAC(newFilter, todoListId2)
  const endState = todolistsReducer(startStateTodolists, action)

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})


test('todolist should be set to the state', () => {
  const action = setTodolistAC(startStateTodolists) //тудолисты брать с сервера!
  const endState = todolistsReducer([], action)

  expect(endState[0].filter).toBe('all')
  expect(endState.length).toBe(2)
})


test('todolist should be set to the entityStatus', () => {
  let newStatus: RequestStatusType = "succeeded"
  const action = changeStatusTodolistAC(newStatus, todoListId1)
  const endState = todolistsReducer([], action)

  expect(endState[0].entityStatus).toBe("succeeded")
  expect(startStateTodolists[0].entityStatus).toBe("idle")
})
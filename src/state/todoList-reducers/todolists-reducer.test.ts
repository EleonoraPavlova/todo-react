import { todoListId2, todoListId1 } from "../../apps/App/id-utils"
import { startStateTodolists } from "../../apps/App/todolistsStartState"
import {
  AddTodolistAC,
  ChangeFilterTodolistAC,
  ChangeTitleTodolistAC,
  RemoveTodolistAC,
  todolistsReducer,
  FilterValuesType,
} from './todolists-reducer'


test('correct todolist should be removed', () => {
  const endState = todolistsReducer(startStateTodolists, RemoveTodolistAC(todoListId2))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todoListId1)
})


test('correct todolist should be added', () => {
  let newTodolistTitle = 'New Todolist'

  const endState = todolistsReducer(startStateTodolists, AddTodolistAC(newTodolistTitle))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTodolistTitle)
  expect(endState[2].filter).toBe("all")
})

test('correct todolist should change its name', () => {
  let newTodolistTitle = 'New Todolist'

  const action = ChangeTitleTodolistAC(newTodolistTitle, todoListId2)
  const endState = todolistsReducer(startStateTodolists, action)

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})


test('correct filter of todolist should be changed', () => {
  let newFilter: FilterValuesType = 'completed'

  const action = ChangeFilterTodolistAC(newFilter, todoListId2)
  const endState = todolistsReducer(startStateTodolists, action)

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})
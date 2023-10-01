import { TasksObjType, TodoListsType } from "../apps/App"
import { tasksReducer } from "./tasks-reducers/tasks-reducer"
import { addTodolistAC, todolistsReducer } from "./todoList-reducers/todolists-reducer"

//общий редьюсер для tasks / todolists, 
//если нужно генерировать общие значения для state


test('ids should be equals', () => {
  const startTasksState: TasksObjType = {}
  const startTodolistsState: TodoListsType[] = []

  const action = addTodolistAC('new todolist')

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.todolistId)
  expect(idFromTodolists).toBe(action.todolistId)
})​

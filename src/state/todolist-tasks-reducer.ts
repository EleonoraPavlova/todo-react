import { TaskPriorities, TaskStatuses, TaskTypeApi, TasksObjType } from "../api_DAL/tasks-api"
import { todoListId1 } from "../apps/App/id-utils"
import { tasksReducer } from "./tasks-reducers/tasks-reducer"
import { AddTodolistAC, TodolistDomainType, todolistsReducer } from "./todoList-reducers/todolists-reducer"

//общий редьюсер для tasks / todolists, 
//если нужно генерировать общие значения для state


test('ids should be equals', () => {
  const startTasksState: TasksObjType = {}
  const startTodolistsState: TodolistDomainType[] = []

  const newTodolist = {
    id: todoListId1, title: 'What to learn', addedDate: "",
    order: 0
  }
  const action = AddTodolistAC(newTodolist)

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.todolist)
  expect(idFromTodolists).toBe(action.todolist.id)
})

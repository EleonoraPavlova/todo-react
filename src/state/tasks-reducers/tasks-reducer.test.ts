import { AddTodolistAC, RemoveTodolistAC } from "../todoList-reducers/todolists-reducer"
import { TaskStatuses } from "../../api/tasks-api"
import { startStateTasks } from "../../apps/App/tasksStartState"
import { todoListId1, todoListId2 } from "../../apps/App/id-utils"
import { AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer } from "./tasks-reducer"


test('new array should be added when new todolist is added', () => {
  const endState = tasksReducer(startStateTasks, AddTodolistAC('new separate todolist'))

  const keys = Object.keys(endState)
  const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')

  //ts будет генерировать ошибку на проверку, обязательно нужно добавить условие, если find
  //не найдет
  if (!newKey) { //значит новый лист не создался!
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toStrictEqual([])
  //если нужно сравнить массивы! 2 массивы не равны друг другу! toBe не подходит!
})



test('correct task should be removed', () => {
  const endState = tasksReducer(startStateTasks, RemoveTaskAC(startStateTasks[todoListId1][0].id, todoListId1))

  expect(endState[todoListId1].length).toBe(3)
  expect(endState[todoListId2].length).toBe(4)
  // expect(endState[todolistId1].every(t => t.id !== startState[todolistId1][0].id)).toBeTruthy() //пробегаемся по массиву и ищем удаленную id
  expect(endState[todoListId1][0].title).toBe("JS")
})


test('correct task should be added', () => {
  let newInputValue = 'New task'

  const endState = tasksReducer(startStateTasks, AddTaskAC(newInputValue, todoListId2))

  expect(endState[todoListId2].length).toBe(5)
  expect(startStateTasks[todoListId2].length).toBe(4)
  expect(endState[todoListId2][0].title).toBe(newInputValue)
  expect(endState[todoListId2][0].status).toBe(TaskStatuses.New) //false
})

test('correct task should change its name', () => {
  let newTaskName = 'Change title'

  const endState = tasksReducer(startStateTasks, ChangeTaskTitleAC(startStateTasks[todoListId1][0].id, newTaskName, todoListId1))

  expect(endState[todoListId1][0].title).toBe(newTaskName)
  expect(endState[todoListId1].length).toBe(4)
  expect(endState[todoListId1][0].status).toBeTruthy() //true
  expect(startStateTasks[todoListId1][0].title).toBe("HTML&CSS")
})


test('correct status of task should be changed', () => {
  const action = ChangeTaskStatusAC(todoListId2, startStateTasks[todoListId2][0].id, TaskStatuses.New)
  const endState = tasksReducer(startStateTasks, action)

  expect(endState[todoListId2].length).toBe(4)
  expect(endState[todoListId2][0].status).toBe(TaskStatuses.New)  // New = 0,  //false
  expect(endState[todoListId2][0].title).toBe("Milk")
})


test('property with todolistId should be deleted', () => {
  const action = RemoveTodolistAC('todolistId2')

  const endState = tasksReducer(startStateTasks, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState[todoListId2]).not.toBeDefined()
})
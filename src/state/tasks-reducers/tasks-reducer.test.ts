
import { v1 } from 'uuid'
import { TasksType } from '../../apps/App/App'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./tasks-reducer"
import { addTodolistAC, removeTodolistAC } from "../todoList-reducers/todolists-reducer"


test('new array should be added when new todolist is added', () => {
  const startState: TasksType = {
    'todolistId1': [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false }
    ],
    'todolistId2': [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false }
    ]
  }

  const endState = tasksReducer(startState, addTodolistAC('new separate todolist'))

  const keys = Object.keys(endState)
  const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')

  //ts будет генерировать ошибку на проверку, обязательно нужно добавить условие, если find
  //не найдет
  if (!newKey) { //значит новый лист не создался!
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toStrictEqual([]) //если нужно сравнить массивы! 2 массивы не равны друг другу! toBe не подходит!
})



test('correct task should be removed', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  const startState: TasksType = {
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Redax", isDone: false }
    ],
    [todolistId2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Juice", isDone: true },
      { id: v1(), title: "Meat", isDone: false },
      { id: v1(), title: "Bread", isDone: false }
    ]
  }
  const endState = tasksReducer(startState, removeTaskAC(startState[todolistId1][0].id, todolistId1))

  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId2].length).toBe(4)
  // expect(endState[todolistId1].every(t => t.id !== startState[todolistId1][0].id)).toBeTruthy() //пробегаемся по массиву и ищем удаленную id
  expect(endState[todolistId1][0].title).toBe("JS")
})


test('correct task should be added', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  let newInputValue = 'New task'

  const startState: TasksType = {
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Redax", isDone: false }
    ],
    [todolistId2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Juice", isDone: true },
      { id: v1(), title: "Meat", isDone: false },
      { id: v1(), title: "Bread", isDone: false }
    ]
  }

  const endState = tasksReducer(startState, addTaskAC(newInputValue, todolistId2))

  expect(endState[todolistId2].length).toBe(5)
  expect(startState[todolistId2].length).toBe(4)
  expect(endState[todolistId2][0].title).toBe(newInputValue)
  expect(endState[todolistId2][0].isDone).toBe(false)
})

test('correct task should change its name', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  let newTaskName = 'Change title'

  const startState: TasksType = {
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Redax", isDone: false }
    ],
    [todolistId2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Juice", isDone: true },
      { id: v1(), title: "Meat", isDone: false },
      { id: v1(), title: "Bread", isDone: false }
    ]
  }

  const endState = tasksReducer(startState, changeTaskTitleAC(startState[todolistId1][0].id, newTaskName, todolistId1))

  expect(endState[todolistId1][0].title).toBe(newTaskName)
  expect(endState[todolistId1].length).toBe(4)
  expect(endState[todolistId1][0].isDone).toBeTruthy()
  expect(startState[todolistId1][0].title).toBe("HTML&CSS")
})


test('correct status of task should be changed', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  const startState: TasksType = {
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Redax", isDone: false }
    ],
    [todolistId2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Juice", isDone: true },
      { id: v1(), title: "Meat", isDone: false },
      { id: v1(), title: "Bread", isDone: false }
    ]
  }

  const action = changeTaskStatusAC(todolistId2, startState[todolistId2][0].id, false)
  const endState = tasksReducer(startState, action)

  expect(endState[todolistId2].length).toBe(4)
  expect(endState[todolistId2][0].isDone).toBe(false)
  expect(endState[todolistId2][0].title).toBe("Milk")
})


test('property with todolistId should be deleted', () => {
  const startState: TasksType = {
    'todolistId1': [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false }
    ],
    'todolistId2': [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false }
    ]
  }

  const action = removeTodolistAC('todolistId2')

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
})
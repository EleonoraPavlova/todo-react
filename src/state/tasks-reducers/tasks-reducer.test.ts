import { addTodolistAC, removeTodolistAC, setTodolistAC } from "../todoList-reducers/todolists-reducer"
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, setTasksAC, tasksReducer } from "./tasks-reducer"
import { startStateTodolists } from "../initialState/todolistsStartState"
import { TaskPriorities, TaskStatuses } from "../../api_DAL/tasks-api"
import { startStateTasks } from "../initialState/tasksStartState"
import { v1 } from "uuid";

const todoListId1 = v1()
const todoListId2 = v1()

let startState;

beforeEach(() => {
  startState = {
    [todoListId1]: [
      {
        id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
        description: "", completed: true,
        priority: TaskPriorities.Low, startDate: "",
        todoListId: todoListId1, deadline: "", order: 1, addedDate: ""
      },
      {
        id: v1(), title: "JS", status: TaskStatuses.Completed,
        description: "", completed: true,
        priority: TaskPriorities.Low, startDate: "",
        todoListId: todoListId1, deadline: "", order: 1, addedDate: ""
      },
      {
        id: v1(), title: "ReactJS", status: TaskStatuses.New,
        description: "", completed: true,
        priority: TaskPriorities.Low, startDate: "",
        todoListId: todoListId1, deadline: "", order: 1, addedDate: ""
      },
      {
        id: v1(), title: "Redax", status: TaskStatuses.New,
        description: "", completed: true,
        priority: TaskPriorities.Low, startDate: "",
        todoListId: todoListId1, deadline: "", order: 1, addedDate: ""
      }
    ],
    [todoListId2]: [
      {
        id: v1(), title: "Milk", status: TaskStatuses.Completed,
        description: "", completed: true,
        priority: TaskPriorities.Low, startDate: "",
        todoListId: todoListId2, deadline: "", order: 1, addedDate: ""
      },
      {
        id: v1(), title: "Juice", status: TaskStatuses.Completed,
        description: "", completed: true,
        priority: TaskPriorities.Low, startDate: "",
        todoListId: todoListId2, deadline: "", order: 1, addedDate: ""
      },
      {
        id: v1(), title: "Meat", status: TaskStatuses.New,
        description: "", completed: true,
        priority: TaskPriorities.Low, startDate: "",
        todoListId: todoListId2, deadline: "", order: 1, addedDate: ""
      },
      {
        id: v1(), title: "Bread", status: TaskStatuses.New,
        description: "", completed: true,
        priority: TaskPriorities.Low, startDate: "",
        todoListId: todoListId2, deadline: "", order: 1, addedDate: ""
      }
    ],
  }
})

test('new array should be added when new todolist is added', () => {
  const endState = tasksReducer(startStateTasks, addTodolistAC({
    todolist: {
      id: todoListId1, title: 'What to learn', addedDate: "",
      order: 0
    }
  }))

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
  const endState = tasksReducer(startStateTasks, removeTaskAC({ todolistId: startStateTasks[todoListId1][0].id, taskId: todoListId1 }))

  expect(endState[todoListId1].length).toBe(3)
  expect(endState[todoListId2].length).toBe(4)
  // expect(endState[todolistId1].every(t => t.id !== startState[todolistId1][0].id)).toBeTruthy() //пробегаемся по массиву и ищем удаленную id
  expect(endState[todoListId1][0].title).toBe("JS")
})


test('correct task should be added', () => {
  const newTask = {
    id: todoListId1, title: "Juice", status: TaskStatuses.Completed,
    description: "", completed: true,
    priority: 0, startDate: "1",
    todoListId: todoListId1, deadline: "", order: 1, addedDate: ""
  }
  const endState = tasksReducer(startStateTasks, addTaskAC({ task: newTask }))

  expect(endState[todoListId2].length).toBe(5)
  expect(startStateTasks[todoListId2].length).toBe(4)
  expect(endState[todoListId2][0]).toBe(newTask)
  expect(endState[todoListId2][0].status).toBe(TaskStatuses.New) //false
})

test('correct task should change its name', () => {
  let newTaskName = 'Change title'

  const endState = tasksReducer(startStateTasks,
    changeTaskTitleAC({ id: startStateTasks[todoListId1][0].id, title: newTaskName, todolistId: todoListId1 }))

  expect(endState[todoListId1][0].title).toBe(newTaskName)
  expect(endState[todoListId1].length).toBe(4)
  expect(endState[todoListId1][0].status).toBeTruthy() //true
  expect(startStateTasks[todoListId1][0].title).toBe("HTML&CSS")
})


test('correct status of task should be changed', () => {
  const action = changeTaskStatusAC({ todolistId: todoListId2, id: startStateTasks[todoListId2][0].id, status: 0 })
  const endState = tasksReducer(startStateTasks, action)

  expect(endState[todoListId2].length).toBe(4)
  expect(endState[todoListId2][0].status).toBe(0)
  expect(endState[todoListId2][0].title).toBe("Milk")
})


test('property with todolistId should be deleted', () => {
  const action = removeTodolistAC({ todolistId: 'todolistId2' })

  const endState = tasksReducer(startStateTasks, action)

  const keysEnd = Object.keys(endState)

  expect(keysEnd.length).toBe(2)
  expect(endState[todoListId2]).not.toBeDefined()
})


test('empty array should be added when we set todolists', () => {
  const action = setTodolistAC({ todolists: startStateTodolists })

  const endState = tasksReducer({}, action) //потому что начальный state пустой объект in reducer

  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState["1"]).toStrictEqual([]) //моковые значения массивов ключей endState["1"]
  expect(endState["2"]).toStrictEqual([])
})


test('tasks should be added for todolists', () => {
  const action = setTasksAC({ tasks: startStateTasks["todolistId1"], todoListId: "todolistId1" })

  const endState = tasksReducer({
    "todolistId2": [],
    "todolistId1": []
  }, action) //потому что начальный state пустой объект in reducer

  expect(endState["todolistId1"].length).toBe(6) //моковые значения массивов ключей endState["1"]
  expect(endState["todolistId1"].length).toBe(4)
})
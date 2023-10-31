import { useState } from "react"
import { TasksType } from "../App"
import { todoListId1, todoListId2 } from "../id-utils"
import { v1 } from "uuid"

export function useTasks() {
  let [tasks, setTasks] = useState<TasksType>({
    [todoListId1]: [ //id этот передала пропсами id={l.id}  в  TodoList
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Redax", isDone: false }
    ],
    [todoListId2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Juice", isDone: true },
      { id: v1(), title: "Meat", isDone: false },
      { id: v1(), title: "Bread", isDone: false }
    ]
  })

  function removeTask(id: string, todoListId: string) {
    let tasksArr = tasks[todoListId]//достала нужный массив сначала
    let filteredTasks = tasksArr.filter(t => t.id !== id) // получила фильтрованные таски
    tasks[todoListId] = filteredTasks //перезаписать массив: такски которые были по дефолту на новые фильтрованные
    setTasks({ ...tasks }) //cделала копию ВСЕГО объекта тасок, чтобы перезапипись массива была отренденена
    //react не реагирует на присваивание, он реагирует создание копии массива объекта и тд
  }

  function addTask(inputValue: string, todoListId: string) {
    let tasksArr = tasks[todoListId]//достала нужный массив сначала
    let newTask = { id: v1(), title: inputValue, isDone: false }
    tasks[todoListId] = [newTask, ...tasksArr]
    setTasks({ ...tasks })
  }

  function changeStatus(todoListId: string, id: string, isDone: boolean) {
    setTasks({ ...tasks, [todoListId]: tasks[todoListId].map(t => t.id === id ? { ...t, isDone: isDone } : t) })
    // [togoListId]: это зашли в объект по id!!!
    // let tasks = tasksObj[togoListId]//достала нужный массив сначала
    // let task = tasks.find(t => t.id === taskId)
    // if (task) {
    //   task.isDone = isDone;
    //   setTasks({ ...tasksObj }) //чтобы был перерендер изменения! обязательно!
    // }
  }

  function changeEditableSpan(id: string, input: string, todoListId: string) {
    let tasksArr = tasks[todoListId]//достала нужный массив сначала
    let task = tasksArr.find(t => t.id === id)
    if (task) {
      task.title = input;
      setTasks({ ...tasks }) //чтобы был перерендер изменения! обязательно!
    }
  }

  function removeTodolistsSetTasks(todoListId: string) {
    delete tasks[todoListId]
    setTasks({ ...tasks })
  }

  function addTodoListSetTasks(newTodolist: string) {
    setTasks({ ...tasks, [newTodolist]: [] })//cоздала совершенно новый список
  }

  return { tasks, setTasks, removeTask, addTask, changeStatus, changeEditableSpan, removeTodolistsSetTasks, addTodoListSetTasks }
}
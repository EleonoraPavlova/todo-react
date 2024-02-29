import { useState } from 'react'
import { v1 } from 'uuid'
import { TaskPriorities, TaskStatuses, TasksObjType } from '../../../api_DAL/tasks-api'
import { startStateTasks } from '../../../state/initialState/tasksStartState'

export function useTasks() {
  let [tasks, setTasks] = useState<TasksObjType>(startStateTasks)

  function removeTask(id: string, todoListId: string) {
    let tasksArr = startStateTasks[todoListId] //достала нужный массив сначала
    let filteredTasks = tasksArr.filter((t) => t.id !== id) // получила фильтрованные таски
    startStateTasks[todoListId] = filteredTasks //перезаписать массив: такски которые были по дефолту на новые фильтрованные
    setTasks({ ...tasks }) //cделала копию ВСЕГО объекта тасок, чтобы перезапипись массива была отренденена
    //react не реагирует на присваивание, он реагирует создание копии массива объекта и тд
  }

  function addTask(inputValue: string, todoListId: string) {
    let tasksArr = tasks[todoListId] //достала нужный массив сначала
    let newTask = {
      id: v1(),
      title: inputValue,
      status: TaskStatuses.Completed,
      description: 'Decs',
      completed: true,
      priority: TaskPriorities.Low,
      startDate: '',
      todoListId: todoListId,
      deadline: '',
      order: 1,
      addedDate: '',
    }
    tasks[todoListId] = [newTask, ...tasksArr]
    setTasks({ ...tasks })
  }

  function changeStatus(todoListId: string, id: string, status: TaskStatuses) {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((t) => (t.id === id ? { ...t, status: status } : t)),
    })
    // [togoListId]: это зашли в объект по id!!!
    // let tasks = tasksObj[togoListId]//достала нужный массив сначала
    // let task = tasks.find(t => t.id === taskId)
    // if (task) {
    //   task.isDone = isDone;
    //   setTasks({ ...tasksObj }) //чтобы был перерендер изменения! обязательно!
    // }
  }

  function changeTaskTitle(id: string, input: string, todoListId: string) {
    let tasksArr = tasks[todoListId] //достала нужный массив сначала
    let task = tasksArr.find((t) => t.id === id)
    if (task) {
      task.title = input
      setTasks({ ...tasks }) //чтобы был перерендер изменения! обязательно!
    }
  }

  function removeTodolistsSetTasks(todoListId: string) {
    delete tasks[todoListId]
    setTasks({ ...tasks })
  }

  function addTodoListSetTasks(newTodolist: string) {
    setTasks({ ...tasks, [newTodolist]: [] }) //cоздала совершенно новый список
  }

  return {
    tasks,
    setTasks,
    removeTask,
    addTask,
    changeStatus,
    changeTaskTitle,
    removeTodolistsSetTasks,
    addTodoListSetTasks,
  }
}

//how to use hooks in the ui
// const { tasks, removeTask, addTask, changeStatus, changeTaskTitle, removeTodolistsSetTasks, addTodoListSetTasks } =
//   useTasks()
// //connected 2 hooks together
// const { todoLists, changeFilter, removeTodolist, changeTodolistTitle } =
//   useTodolists(removeTodolistsSetTasks, addTodoListSetTasks)

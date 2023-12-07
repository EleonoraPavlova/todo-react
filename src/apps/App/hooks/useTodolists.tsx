import { useState } from "react"
import { FilterValuesType, TodolistDomainType } from "../../../state/todoList-reducers/todolists-reducer"
import { startStateTodolists } from "../../../state/initialState/todolistsStartState"
import { v1 } from "uuid"

export function useTodolists(removeTodolistsSetTasks: (todoListId: string) => void, addTodoListSetTasks: (newTodolist: string) => void) {
  //внутри кастомных хуков можно использовать другие хуки!
  //хуки не должны быть в if
  let [todoLists, setTodoLists] = useState<TodolistDomainType[]>(startStateTodolists)
  //этот стейт для управления  map отрисовки TodoList

  function changeFilter(value: FilterValuesType, todoListId: string) {
    let todoList = todoLists.find((t) => t.id === todoListId)
    if (todoList) {
      todoList.filter = value
      return setTodoLists([...todoLists])
    }
  }

  function removeTodolist(todoListId: string) {
    let removeTodoList = todoLists.filter(l => l.id !== todoListId) //filter возвращает новый массив
    setTodoLists(removeTodoList)
    removeTodolistsSetTasks(todoListId) //внутри todolist удалили таску, вот ее id
  }

  function changeTodolistTitle(title: string, todoListId: string) {
    let foundTodoLists = todoLists.find(t => t.id === todoListId)//достала нужный массив сначала
    if (foundTodoLists) {
      foundTodoLists.title = title
      setTodoLists([...todoLists])
    }
  }


  function addTodoList(input: string) { //добавление новой колонки списка задач
    let newTodolist: TodolistDomainType = {
      id: v1(),
      title: input, //приходит из тестов с action
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "idle"
    }
    setTodoLists([newTodolist, ...todoLists])
    addTodoListSetTasks(newTodolist.id)//cоздала совершенно новый список
  }

  //setTodoLists не импортируем, инкапсулировала в хуке

  return { todoLists, changeFilter, removeTodolist, changeTodolistTitle, addTodoList }
}
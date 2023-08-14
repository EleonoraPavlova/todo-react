import React, { useState } from 'react';
import "./style/App.css";
import TodoList, { Task } from './components/TodoList/TodoList';
import { v1 } from "uuid";
import { AddItemForm } from "./components/AddItemForm/AddItemForm";

export type TodoListsType = {
  id: string
  title: string
  filter: FilterValues
}

type tasksObjType = {
  [key: string]: Task[]
}


export type FilterValues = "all" | "completed" | "active"

function App() {

  // let [tasks, setTasks] = useState<Task[]>([
  //   { id: v1(), title: "HTML&CSS", isDone: true },
  //   { id: v1(), title: "JS", isDone: true },
  //   { id: v1(), title: "ReactJS", isDone: false },
  //   { id: v1(), title: "Redax", isDone: false }
  // ])

  let todoListId1 = v1()
  let todoListId2 = v1()

  let [tasksObj, setTasks] = useState<tasksObjType>({
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

  function removeTask(id: string, togoListId: string) {
    let tasks = tasksObj[togoListId]//достала нужный массив сначала
    let filteredTasks = tasks.filter(t => t.id !== id) // получила фильтрованные таски
    tasksObj[togoListId] = filteredTasks //перезаписать массив: такски которые были по дефолту на новые фильтрованные
    setTasks({ ...tasksObj }) //cделала копию ВСЕГО объекта тасок, чтобы перезапипись массива была отренденена
    //react не реагирует на присваивание, он реагирует создание копии массива объекта и тд
  }

  function addTask(inputValue: string, togoListId: string) {
    debugger
    let tasks = tasksObj[togoListId]//достала нужный массив сначала
    debugger
    let newTask = { id: v1(), title: inputValue, isDone: false }
    debugger
    tasksObj[togoListId] = [newTask, ...tasks]
    debugger
    console.log({ ...tasksObj })
    setTasks({ ...tasksObj })
  }

  function changeStatus(taskId: string, isDone: boolean, togoListId: string) {
    let tasks = tasksObj[togoListId]//достала нужный массив сначала
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj }) //чтобы был перерендер изменения! обязательно!
    }
  }

  let [todoLists, setTodoLists] = useState<TodoListsType[]>([ //этот стейт для управления  map отрисовки TodoList
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to buy", filter: "all" }
  ])


  function changeFilterHandler(value: FilterValues, id: string) {
    let todoList = todoLists.find((t) => t.id === id)
    if (todoList) {
      todoList.filter = value
      return setTodoLists([...todoLists])
    }
  }


  function removeTodolist(togoListId: string) {
    let removeTodoList = todoLists.filter(l => l.id !== togoListId) //filter возвращает новый массив
    setTodoLists(removeTodoList)
    delete tasksObj[togoListId]
    setTasks({ ...tasksObj })
    console.log(tasksObj)
  }

  function addTodoList(input: string) {
    addTask(input, todoListId1)
  }

  return (
    <div className="App">
      <AddItemForm addTask={addTodoList} />
      {todoLists.map((l) => {

        let tasksForTodolist = tasksObj[l.id];
        if (l.filter === 'completed') {
          tasksForTodolist = tasksObj[l.id].filter(t => t.isDone);
        }
        if (l.filter === 'active') {
          tasksForTodolist = tasksObj[l.id].filter(t => !t.isDone);
        }

        return (<div key={l.id} >
          <TodoList tasks={tasksForTodolist} title={l.title}
            removeTask={removeTask} addTask={addTask} changeStatus={changeStatus}
            id={l.id} filter={l.filter} changeFilterHandler={changeFilterHandler} removeTodolist={removeTodolist} />
        </div>)
      }
      )}
    </div>
  );
}
export default App;

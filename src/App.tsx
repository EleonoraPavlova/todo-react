import React, { useState } from 'react';
import "./style/App.css";
import TodoList, { Task } from './components/TodoList/TodoList';
import { v1 } from "uuid";
import { AddItemForm } from "./components/AddItemForm/AddItemForm";
import { AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";

export type TodoListsType = {
  id: string
  title: string
  filter: FilterValues
}

export type TasksObjType = {
  [key: string]: Task[]
}

export type FilterValues = "all" | "completed" | "active"

let todoListId1 = v1()
let todoListId2 = v1()

function App() {
  let [tasksObj, setTasks] = useState<TasksObjType>({
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

  let [todoLists, setTodoLists] = useState<TodoListsType[]>([ //этот стейт для управления  map отрисовки TodoList
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to buy", filter: "all" }
  ])

  function removeTask(id: string, togoListId: string) {
    let tasks = tasksObj[togoListId]//достала нужный массив сначала
    let filteredTasks = tasks.filter(t => t.id !== id) // получила фильтрованные таски
    tasksObj[togoListId] = filteredTasks //перезаписать массив: такски которые были по дефолту на новые фильтрованные
    setTasks({ ...tasksObj }) //cделала копию ВСЕГО объекта тасок, чтобы перезапипись массива была отренденена
    //react не реагирует на присваивание, он реагирует создание копии массива объекта и тд
  }

  function addTask(inputValue: string, togoListId: string) {
    let tasks = tasksObj[togoListId]//достала нужный массив сначала
    let newTask = { id: v1(), title: inputValue, isDone: false }
    tasksObj[togoListId] = [newTask, ...tasks]
    setTasks({ ...tasksObj })
  }

  function changeStatus(togoListId: string, id: string, isDone: boolean) {
    setTasks({ ...tasksObj, [togoListId]: tasksObj[togoListId].map(t => t.id === id ? { ...t, isDone: isDone } : t) })
    // [togoListId]: это зашли в объект по id!!!
    // let tasks = tasksObj[togoListId]//достала нужный массив сначала
    // let task = tasks.find(t => t.id === taskId)
    // if (task) {
    //   task.isDone = isDone;
    //   setTasks({ ...tasksObj }) //чтобы был перерендер изменения! обязательно!
    // }
  }


  function changeFilterHandler(value: FilterValues, todoListId: string) {
    let todoList = todoLists.find((t) => t.id === todoListId)
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
  }

  function addTodoList(input: string) { //добавление новой колонки списка задач
    let newTodolist: TodoListsType = {
      id: v1(),
      title: input,
      filter: "all"
    }
    setTodoLists([newTodolist, ...todoLists])
    setTasks({ ...tasksObj, [newTodolist.id]: [] })//cоздала совершенно новый список
  }

  function changeEditableSpan(id: string, input: string, togoListId: string) {
    let tasks = tasksObj[togoListId]//достала нужный массив сначала
    let task = tasks.find(t => t.id === id)
    if (task) {
      task.title = input;
      setTasks({ ...tasksObj }) //чтобы был перерендер изменения! обязательно!
    }
  }

  function changeEditableSpanTitle(title: string, togoListId: string) {
    let foundTodoLists = todoLists.find(t => t.id === togoListId)//достала нужный массив сначала
    if (foundTodoLists) {
      foundTodoLists.title = title
      setTodoLists([...todoLists])
    }
  }

  const mappedList = () => {
    return todoLists.map((l) => {
      let tasksForTodolist = tasksObj[l.id];
      if (l.filter === 'completed') {
        tasksForTodolist = tasksObj[l.id].filter(t => t.isDone);
      }
      if (l.filter === 'active') {
        tasksForTodolist = tasksObj[l.id].filter(t => !t.isDone);
      }

      return (<Grid item key={l.id}>
        <Paper className="paper">
          <TodoList tasks={tasksForTodolist}
            title={l.title}
            removeTask={removeTask}
            addTask={addTask}
            changeStatus={changeStatus}
            id={l.id} filter={l.filter}
            changeFilterHandler={changeFilterHandler}
            removeTodolist={removeTodolist}
            changeEditableSpan={changeEditableSpan}
            changeEditableSpanTitle={changeEditableSpanTitle}
          />
        </Paper>
      </Grid>
      )
    })
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Menu
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Container maxWidth="sm" >
          <div className="container" >
            <AddItemForm addTask={addTodoList} />
          </div>
        </Container>
        <Grid container spacing={7} className="grid">
          {mappedList()}
        </Grid>
      </Container >
    </div >
  );
}
export default App;

import React, { useReducer } from 'react';
import "./style/App.css";
import TodoList, { Task } from '../components/TodoList/TodoList';
import { v1 } from "uuid";
import { AddItemForm } from "../components/AddItemForm/AddItemForm";
import { AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "../state/tasks-reducers/tasks-reducer";
import { addTodolistAC, changeFilterTodolistAC, changeTitleTodolistAC, removeTodolistAC, todolistsReducer } from "../state/todoList-reducers/todolists-reducer";

export type TodoListsType = {
  id: string
  title: string
  filter: FilterValues
}

export type TasksType = {
  [key: string]: Task[]
}

export type FilterValues = "all" | "completed" | "active"

let todoListId1 = v1()
let todoListId2 = v1()

function AppReducer() {
  let [tasksObj, dispatchTasks] = useReducer(tasksReducer, {
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

  let [todoLists, dispatchTodoLists] = useReducer(todolistsReducer, [ //этот стейт для управления  map отрисовки TodoList
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to buy", filter: "all" }
  ])

  //tasks action creators
  function removeTask(id: string, todoListId: string) {
    const action = removeTaskAC(id, todoListId)
    dispatchTasks(action)
  }

  function addTask(inputValue: string, todoListId: string) {
    const action = addTaskAC(inputValue, todoListId)
    dispatchTasks(action)
  }

  function changeStatus(todoListId: string, id: string, isDone: boolean) {
    const action = changeTaskStatusAC(todoListId, id, isDone)
    dispatchTasks(action)
  }

  function changeEditableSpan(id: string, input: string, todoListId: string) {
    const action = changeTaskTitleAC(id, input, todoListId)
    dispatchTasks(action)
  }


  // todolists action creators
  function changeFilterHandler(value: FilterValues, todoListId: string) {
    const action = changeFilterTodolistAC(value, todoListId)
    dispatchTodoLists(action)
  }

  function removeTodolist(todoListId: string) {
    const action = removeTodolistAC(todoListId)
    dispatchTodoLists(action)
    dispatchTasks(action)
  }

  function addTodoList(input: string) { //добавление новой колонки списка задач
    const action = addTodolistAC(input)
    dispatchTodoLists(action)
    dispatchTasks(action)
  }


  function changeTodolistTitle(title: string, todoListId: string) {
    const action = changeTitleTodolistAC(title, todoListId)
    dispatchTodoLists(action)
  }

  const mappedList = () => {
    return todoLists.map((l) => {
      let tasksForTodolist = tasksObj[l.id];
      if (l.filter === 'completed') {
        tasksForTodolist = tasksObj[l.id].filter((t: Task) => t.isDone);
      }
      if (l.filter === 'active') {
        tasksForTodolist = tasksObj[l.id].filter((t: Task) => !t.isDone);
      }

      return (<Grid item key={l.id}>
        <Paper sx={{ padding: "20px" }} elevation={3}>
          <TodoList tasks={tasksForTodolist}
            title={l.title}
            removeTask={removeTask}
            addTask={addTask}
            changeStatus={changeStatus}
            todoListId={l.id} filter={l.filter}
            changeFilterHandler={changeFilterHandler}
            removeTodolist={removeTodolist}
            changeEditableSpan={changeEditableSpan}
            changeTodolistTitle={changeTodolistTitle}
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
export default AppReducer;

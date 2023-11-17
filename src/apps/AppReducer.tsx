import React, { useReducer } from 'react';
import "./style/App.css";
import TodoList from '../components/TodoList/TodoList';
import { v1 } from "uuid";
import { AddItemForm } from "../components/AddItemForm/AddItemForm";
import { AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer } from "../state/tasks-reducers/tasks-reducer";
import { AddTodolistAC, ChangeFilterTodolistAC, ChangeTitleTodolistAC, FilterValuesType, RemoveTodolistAC, todolistsReducer } from "../state/todoList-reducers/todolists-reducer";
import { TaskPriorities, TaskStatuses, TaskTypeApi } from "../api_DAL/tasks-api";

// export type TodoListsType = {
//   id: string
//   title: string
//   filter: FilterValues
// }

// export type TasksType = {
//   [key: string]: Task[]
// }

//переделать на санки

let todoListId1 = v1()
let todoListId2 = v1()

function AppReducer() {
  let [tasks, dispatchTasks] = useReducer(tasksReducer, {
    ["todolistId1"]: [  //id этот передала пропсами id={l.id}  в  TodoList
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
      }
    ],
    ["todolistId2"]: [
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
      }
    ],
  })

  let [todoLists, dispatchTodoLists] = useReducer(todolistsReducer, [ //этот стейт для управления  map отрисовки TodoList
    {
      id: todoListId1, title: 'What to learn', filter: 'all', addedDate: "",
      order: 0
    },
    {
      id: todoListId2, title: 'What to buy', filter: 'all', addedDate: "",
      order: 0
    }
  ])

  //tasks action creators
  function removeTask(id: string, todoListId: string) {
    const action = RemoveTaskAC(id, todoListId)
    dispatchTasks(action)
  }

  function addTask(inputValue: string, todoListId: string) {
    // const action = AddTaskAC(inputValue, todoListId)
    // dispatchTasks(action)
  }

  function changeStatus(todoListId: string, id: string, status: TaskStatuses) {
    const action = ChangeTaskStatusAC(todoListId, id, status)
    dispatchTasks(action)
  }

  function changeTaskTitle(id: string, input: string, todoListId: string) {
    const action = ChangeTaskTitleAC(id, input, todoListId)
    dispatchTasks(action)
  }


  // todolists action creators
  function changeFilterHandler(value: FilterValuesType, todoListId: string) {
    const action = ChangeFilterTodolistAC(value, todoListId)
    dispatchTodoLists(action)
  }

  function removeTodolist(todoListId: string) {
    const action = RemoveTodolistAC(todoListId)
    dispatchTodoLists(action)
    dispatchTasks(action)
  }

  function addTodoList(input: string) { //добавление новой колонки списка задач
    // const action = AddTodolistAC(input)
    // dispatchTodoLists(action)
    // dispatchTasks(action)
  }


  function changeTodolistTitle(title: string, todoListId: string) {
    const action = ChangeTitleTodolistAC(title, todoListId)
    dispatchTodoLists(action)
  }

  const mappedList = () => {
    return todoLists.map((l) => {
      let tasksForTodolist = tasks[l.id];
      if (l.filter === 'completed') {
        tasksForTodolist = tasks[l.id].filter((t: TaskTypeApi) => t.status === TaskStatuses.Completed);
      }
      if (l.filter === 'active') {
        tasksForTodolist = tasks[l.id].filter((t: TaskTypeApi) => t.status === TaskStatuses.New);
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
            changeTaskTitle={changeTaskTitle}
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
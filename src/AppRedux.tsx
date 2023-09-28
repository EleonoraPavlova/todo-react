import React, { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./style/App.css";
import TodoList, { Task } from './components/TodoList/TodoList';
import { AddItemForm } from "./components/AddItemForm/AddItemForm";
import { AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducers/tasks-reducer";
import { addTodolistAC, changeFilterTodolistAC, changeTitleTodolistAC, removeTodolistAC } from "./state/todoList-reducers/todolists-reducer";
import { AppRootState } from "./state/store";


export type TodoListsType = {
  id: string
  title: string
  filter: FilterValues
}

export type TasksObjType = {
  [key: string]: Task[]
}

export type FilterValues = "all" | "completed" | "active"


function AppRedux() {
  console.log("AppRedux has been called")
  const dispatch = useDispatch()
  const todolists = useSelector<AppRootState, TodoListsType[]>(state => state.todolist) //выбираем todolist из стора state
  //<AppRootState, TodoListsType[]> означает хотим достать массив todolists из этого типа
  const tasks = useSelector<AppRootState, TasksObjType>(state => state.tasks)

  //tasks action creators
  const removeTask = useCallback((id: string, togoListId: string) => {
    const action = removeTaskAC(id, togoListId)
    dispatch(action)
  }, [])

  const addTask = useCallback((inputValue: string, togoListId: string) => {
    const action = addTaskAC(inputValue, togoListId)
    dispatch(action)
  }, [])

  const changeStatus = useCallback((togoListId: string, id: string, isDone: boolean) => {
    const action = changeTaskStatusAC(togoListId, id, isDone)
    dispatch(action)
  }, [])

  const changeEditableSpan = useCallback((id: string, input: string, togoListId: string) => {
    const action = changeTaskTitleAC(id, input, togoListId)
    dispatch(action)
  }, [])


  // todolists action creators
  const changeFilterHandler = useCallback((value: FilterValues, todoListId: string) => {
    const action = changeFilterTodolistAC(value, todoListId)
    dispatch(action)
  }, [dispatch])

  function removeTodolist(todoListId: string) {
    const action = removeTodolistAC(todoListId)
    dispatch(action)
  }

  const addTodoList = useCallback((input: string) => { //добавление новой колонки списка задач
    const action = addTodolistAC(input)
    dispatch(action)
  }, [])


  const changeEditableSpanTitle = useCallback((title: string, togoListId: string) => {
    const action = changeTitleTodolistAC(title, togoListId)
    dispatch(action)
  }, [])

  const mappedList = () => {
    return todolists.map((l) => {
      let tasksForTodolist = tasks[l.id]
      return (<Grid item key={l.id}>
        <Paper sx={{ padding: "20px" }} elevation={3}>
          <TodoList
            tasks={tasksForTodolist} //передаю все tasks
            title={l.title}
            id={l.id}
            filter={l.filter}
            removeTask={removeTask}
            addTask={addTask}
            changeStatus={changeStatus}
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
export default AppRedux

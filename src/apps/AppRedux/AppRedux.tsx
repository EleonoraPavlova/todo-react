import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import "../../style/App.css";
import TodoList from '../../components/TodoList/TodoList';
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import { AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { ChangeTaskStatusAC, ChangeTaskTitleAC, addTaskTC, removeTaskTC } from "../../state/tasks-reducers/tasks-reducer";
import {
  FilterValuesType, TodolistDomainType,
  AddTodolistAC, ChangeFilterTodolistAC,
  ChangeTitleTodolistAC, RemoveTodolistAC, fetchTodolistTC, removeTodolistTC, addTodolistTC
} from "../../state/todoList-reducers/todolists-reducer";
import { AppRootState } from "../../state/store";
import { TaskStatuses, TaskTypeApi } from "../../api/tasks-api";


// export type TodoListsType = {
//   id: string
//   title: string
//   filter: FilterValues
// }

export type TasksObjType = {
  [key: string]: TaskTypeApi[]
}

// const Fake = memo(() => {
//   console.log("Fake has been called")
//   const arr = useSelector<AppRootState, Task[]>(state => state.tasks.count)
//   return <h1>{arr.length}</h1>
// })


function AppRedux() {
  console.log("AppRedux has been called")

  const dispatch = useDispatch()
  const todolists = useSelector<AppRootState, TodolistDomainType[]>(state => state.todolist) //выбираем todolist из стора state
  //<AppRootState, TodoListsType[]> означает хотим достать массив todolists из этого типа 
  const tasks = useSelector<AppRootState, TasksObjType>(tasks => tasks.tasks)

  //в useEffect выполняются запросы на api
  useEffect(() => { //download all todolists from api when loading the component
    dispatch(fetchTodolistTC as any)
  }, []) //пустой [] - отрабатывает один раз при загрузке страницы!


  //tasks action creators
  const removeTask = useCallback((id: string, todoListId: string) => {
    const thunk = removeTaskTC(todoListId, id) as any
    dispatch(thunk)
  }, [dispatch])

  const addTask = useCallback((title: string, todoListId: string) => {
    const thunk = addTaskTC(title, todoListId) as any
    dispatch(thunk)
  }, [dispatch])

  const changeStatus = useCallback((todoListId: string, id: string, status: TaskStatuses) => {
    const action = ChangeTaskStatusAC(todoListId, id, status)
    dispatch(action)
  }, [dispatch])

  const changeEditableSpan = useCallback((id: string, input: string, todoListId: string) => {
    const action = ChangeTaskTitleAC(id, input, todoListId)
    dispatch(action)
  }, [dispatch])


  // todolists action creators
  const changeFilterHandler = useCallback((value: FilterValuesType, todoListId: string) => {
    const action = ChangeFilterTodolistAC(value, todoListId)
    dispatch(action)
  }, [dispatch])

  const removeTodolist = useCallback((todoListId: string) => {
    const thunk = removeTodolistTC(todoListId) as any
    dispatch(thunk)
  }, [dispatch])

  const addTodoList = useCallback((input: string) => { //добавление новой колонки списка задач
    const thunk = addTodolistTC(input) as any
    dispatch(thunk)
  }, [dispatch])


  const changeTodolistTitle = useCallback((title: string, todoListId: string) => {
    const action = ChangeTitleTodolistAC(title, todoListId)
    dispatch(action)
  }, [dispatch])

  const mappedList = () => {
    return todolists.map((l) => {
      let tasksForTodolist = tasks[l.id]
      return (<Grid item key={l.id}>
        <Paper sx={{ padding: "20px" }} elevation={3}>
          <TodoList
            tasks={tasksForTodolist} //передаю все tasks массив
            title={l.title}
            todoListId={l.id}
            filter={l.filter}
            removeTask={removeTask}
            addTask={addTask}
            changeStatus={changeStatus}
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
export default AppRedux

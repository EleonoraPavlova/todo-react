import React, { useCallback, useEffect } from 'react';
import "../../style/App.css";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import { AppBar, Container, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import {
  addTodolistTC, getTodolistTC
} from "../../state/todoList-reducers/todolists-reducer";
import { TaskTypeApi } from "../../api_DAL/tasks-api";
import { useAppDispatch } from "../../state/hooks/hooks-selectors";
import { TodolistRender } from "../../components/TodolistRender/TodolistRender";


export type TasksObjType = {
  [key: string]: TaskTypeApi[]
}

function AppRedux() {
  const dispatch = useAppDispatch()
  //в useEffect выполняются запросы на api
  useEffect(() => { //download all todolists from api when loading the component
    dispatch(getTodolistTC)
  }, []) //пустой [] - отрабатывает один раз при загрузке страницы!


  const addTodoList = useCallback((input: string) => { //добавление новой колонки списка задач
    const thunk = addTodolistTC(input)
    dispatch(thunk)
  }, [dispatch])

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
          <TodolistRender />
        </Grid>
      </Container >
    </div >
  );
}
export default AppRedux

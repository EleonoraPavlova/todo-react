import React, { useCallback, useEffect } from 'react';
import "../../style/App.css";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import { AppBar, Container, Grid, IconButton, LinearProgress, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import {
  addTodolistTC, getTodolistTC
} from "../../state/todoList-reducers/todolists-reducer";
import { TaskTypeApi } from "../../api_DAL/tasks-api";
import { useAppDispatch, useAppSelector } from "../../state/hooks/hooks-selectors";
import { TodolistRender } from "../../components/TodolistRender/TodolistRender";
import { ErrorSnackbar } from "../../components/ErrorSnackBar/ErrorSnackBar";
import { RequestStatusType } from "../../state/app-reducer/app-reducer";

type AppReduxProps = {
  demo: boolean //загрузка мокового state
}

export type TasksObjType = {
  [key: string]: TaskTypeApi[]
}

export const AppRedux: React.FC<AppReduxProps> = ({ demo = false }) => {
  let status = useAppSelector<RequestStatusType>(state => state.app.status)
  const dispatch = useAppDispatch()
  //в useEffect выполняются запросы на api
  useEffect(() => { //download all todolists from api when loading the component
    if (demo) {
      return;
    }
    dispatch(getTodolistTC)
  }, []) //пустой [] - отрабатывает один раз при загрузке страницы!


  const addTodoList = useCallback((input: string) => { //добавление новой колонки списка задач
    const thunk = addTodolistTC(input)
    dispatch(thunk)
  }, [dispatch])

  return (
    <div className="App">
      <AppBar position="static" sx={{ borderRadius: "5px" }} >
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Menu
          </Typography>
        </Toolbar>
        {status === 'loading' && < LinearProgress />}
      </AppBar>
      <Container>
        <Container maxWidth="sm" >
          <div className="container" >
            <AddItemForm addTask={addTodoList} />
          </div>
        </Container>
        <Grid container spacing={7} className="grid">
          <TodolistRender demo={demo} />
        </Grid>
      </Container >
      <ErrorSnackbar />
    </div >
  );
}
export default AppRedux

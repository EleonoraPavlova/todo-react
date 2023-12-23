import React, { useEffect, useState } from 'react';
import "../../style/App.css";
import { AppBar, Box, Button, Container, IconButton, LinearProgress, ThemeProvider, Toolbar, Typography, createTheme } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { getTodolistTC } from "../../state/todoList-reducers/todolists-reducer";
import { TaskTypeApi } from "../../api_DAL/tasks-api";
import { TodolistRender } from "../../components/TodolistRender/TodolistRender";
import { RequestStatusType } from "../../state/app-reducer/app-reducer";
import { SnackbarComponent } from "../../components/SnackbarComponent/SnackbarComponent";
import { useAppDispatch, useAppSelector } from "../../state/hooks/hooks-selectors";
import { NavLink, Route, Routes } from "react-router-dom";
import { Login } from "../../page/Login/Login";
import { blue, purple } from "@mui/material/colors";


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
    dispatch(getTodolistTC())
  }, []) //пустой [] - отрабатывает один раз при загрузке страницы!

  let [lightMode, setLightMode] = useState<boolean>(true) // для изменения темы стейт
  let btnText = lightMode ? "dark" : "light"
  const themeHandler = createTheme({
    palette: {
      primary: blue,
      secondary: purple,
      mode: lightMode ? "light" : "dark",
    }
  })

  const toggleTheme = () => {
    setLightMode(!lightMode)
  }

  return (
    <ThemeProvider theme={themeHandler}>
      <AppBar position="static" sx={{ borderRadius: "5px" }} >
        <Toolbar variant="dense" sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <Menu />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Todolist
            </Typography>
          </Box>
          <Box>
            <Button variant="outlined" size="small" color={"inherit"} onClick={toggleTheme} sx={{ mr: '10px' }}>
              {btnText}
            </Button>
            <Button variant="outlined" size="small" color={"inherit"}>
              <NavLink to="/login">LogIn</NavLink>
            </Button>
          </Box>
        </Toolbar>
        {status === 'loading' && < LinearProgress />}
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={< TodolistRender demo={demo} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container >
      <SnackbarComponent />
    </ThemeProvider >
  );
}
export default AppRedux

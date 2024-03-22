import React, { useCallback, useEffect, useState } from 'react'
import '../../style/App.css'
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  styled,
} from '@mui/material'
import { Menu } from '@mui/icons-material'
import { Task } from '../../api_DAL/tasks-api'
import { TodolistRender } from '../../components/TodolistRender/TodolistRender'
import { SnackbarComponent } from '../../components/SnackbarComponent/SnackbarComponent'
import { useAppDispatch } from '../../state/hooks/hooks'
import { NavLink, Route, Routes } from 'react-router-dom'
import { Login } from '../../page/Login/Login'
import { blue, purple } from '@mui/material/colors'
import { selectAppInitialized, selectAppStatus, setAppInitializeTC } from 'reducers/appSlice/appSlice'
import { logOutTC, selectIsLoggedIn } from 'reducers/authSlice/authSlice'
import { useSelector } from 'react-redux'

type AppReduxProps = {
  demo: boolean //загрузка мокового state
}

export type TasksObjType = {
  [key: string]: Task[]
}

export const AppRedux: React.FC<AppReduxProps> = ({ demo = false }) => {
  let status = useSelector(selectAppStatus)
  let initialized = useSelector(selectAppInitialized) //first initialization
  let isLoggedIn = useSelector(selectIsLoggedIn) //не залогинены

  const dispatch = useAppDispatch()

  useEffect(() => {
    //download all todolists from api when loading the component
    if (!initialized) dispatch(setAppInitializeTC())
  }, [])

  let [lightMode, setLightMode] = useState<boolean>(true) // для изменения темы стейт
  let btnText = lightMode ? 'dark' : 'light'
  const themeHandler = createTheme({
    palette: {
      primary: blue,
      secondary: purple,
      mode: lightMode ? 'light' : 'dark',
    },
  })

  const toggleTheme = () => {
    setLightMode(!lightMode)
  }

  const logOutHandler = useCallback(() => {
    dispatch(logOutTC())
    ///
  }, [dispatch])

  const CustomCircularProgress = styled(CircularProgress)(({ theme }) => ({
    '& circle': {
      strokeWidth: 2,
    },
  }))

  if (!initialized) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <CustomCircularProgress />
      </Box>
    )
  }

  return (
    <ThemeProvider theme={themeHandler}>
      <AppBar position="static" sx={{ borderRadius: '5px' }}>
        <Toolbar variant="dense" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <Menu />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Todolist
            </Typography>
          </Box>
          <Box>
            <Button variant="outlined" size="small" color={'inherit'} onClick={toggleTheme} sx={{ mr: '10px' }}>
              {btnText}
            </Button>
            {isLoggedIn && (
              <Button variant="outlined" size="small" color={'inherit'} onClick={logOutHandler} sx={{ mr: '10px' }}>
                <NavLink to="/login">Log Out</NavLink>
              </Button>
            )}
          </Box>
        </Toolbar>
        {status === 'loading' && <LinearProgress />}
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<TodolistRender demo={demo} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
      <SnackbarComponent />
    </ThemeProvider>
  )
}
export default AppRedux

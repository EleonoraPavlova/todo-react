import { Menu } from '@mui/icons-material'
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
import { blue, purple } from '@mui/material/colors'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Route, Routes } from 'react-router-dom'
import { selectAppInitialized, selectAppStatus, setAppInitializeTC } from 'reducers/appSlice/appSlice'
import { logOutTC, selectIsLoggedIn } from 'reducers/authSlice/authSlice'
import '../style/App.css'
import { useAppDispatch } from 'state/hooks/hooks'
import { Task } from 'api_DAL/tasks-api'
import { TodolistRender } from 'components/TodolistRender/TodolistRender'
import { Login } from 'page/Login/Login'
import { SnackbarComponent } from 'components/SnackbarComponent/SnackbarComponent'

type AppProps = {
  demo: boolean //загрузка мокового state
}

export type Tasks = {
  [key: string]: Task[]
}

export const App: React.FC<AppProps> = ({ demo = false }) => {
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
export default App

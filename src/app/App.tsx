import { Menu } from '@mui/icons-material'
import { AppBar, Box, Button, IconButton, LinearProgress, ThemeProvider, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Route, Routes } from 'react-router-dom'
import { selectAppInitialized, selectAppStatus } from 'BLL/reducers/appSlice'
import { selectIsLoggedIn } from 'BLL/reducers/authSlice'
import { TodolistRender } from 'components/TodolistRender'
import { Login } from 'features/page/Login'
import { Task } from 'common/types'
import { SnackBar } from 'components/SnackBar'
import { useApp } from './hooks/useApp'

type Props = {
  demo: boolean //download moc state
}

export const App: React.FC<Props> = ({ demo = false }) => {
  let status = useSelector(selectAppStatus)
  let initialized = useSelector(selectAppInitialized) //first initialization
  let isLoggedIn = useSelector(selectIsLoggedIn) //не залогинены

  const { lightMode, themeHandler, btnText, CustomCircularProgress, toggleTheme, logOutHandler } = useApp()

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
      <Box sx={{ margin: '0 60px' }}>
        <Routes>
          <Route path="/" element={<TodolistRender demo={demo} lightMode={lightMode} />} />
          <Route path="/login" element={<Login lightMode={lightMode} />} />
        </Routes>
      </Box>
      <SnackBar />
    </ThemeProvider>
  )
}
export default App

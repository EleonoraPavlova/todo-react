import { Menu } from '@mui/icons-material'
import { AppBar, Box, Button, IconButton, LinearProgress, Toolbar, Typography } from '@mui/material'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { selectAppStatus } from 'BLL/reducers/appSlice'
import { authThunks, selectIsLoggedIn } from 'BLL/reducers/authSlice'
import { useActions } from 'common/hooks'

type Props = {
  btnText: string
  toggleTheme: () => void
}

export const Appbar: React.FC<Props> = ({ btnText, toggleTheme }) => {
  let status = useSelector(selectAppStatus)
  let isLoggedIn = useSelector(selectIsLoggedIn) //не залогинены
  const { logOutTC } = useActions(authThunks)

  const logOutHandler = useCallback(() => {
    logOutTC()
  }, [logOutTC])

  return (
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
  )
}

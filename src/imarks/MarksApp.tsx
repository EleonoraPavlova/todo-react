import React from 'react'
import '../../style/App.css'
import { AddItemForm } from '../components/AddItemForm/AddItemForm'
import { AppBar, Container, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { useTasks } from './hooks/useTasks'
import { useTodolists } from './hooks/useTodolists'
import { TodolistRender } from '../components/TodolistRender/TodolistRender'

type AppProps = {
  demo: boolean //загрузка мокового state
}

export const MarksApp: React.FC<AppProps> = ({ demo = false }) => {
  //using hooks
  const { removeTodolistsSetTasks, addTodoListSetTasks } = useTasks()
  //connected 2 hooks together
  const { addTodoList } = useTodolists(removeTodolistsSetTasks, addTodoListSetTasks)

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
        <Container maxWidth="sm">
          <div className="container">
            <AddItemForm addTask={addTodoList} />
          </div>
        </Container>
        <Grid container spacing={7} className="grid">
          <TodolistRender demo={demo} />
        </Grid>
      </Container>
    </div>
  )
}
export default MarksApp

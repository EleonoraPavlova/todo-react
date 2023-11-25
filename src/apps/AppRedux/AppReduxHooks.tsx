import React from 'react';
import "../../style/App.css";
import TodoList from '../../page/TodoList/TodoList';
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import { AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useAppRedux } from "./hooks/useAppRedux";
import { TodolistDomainType } from "../../state/todoList-reducers/todolists-reducer";


// export type TodoListsType = {
//   id: string
//   title: string
//   filter: FilterValues
// }


function AppReduxHooks() {
  console.log("AppRedux has been called")

  const { todolists, tasks,
    removeTask, addTask, changeStatus,
    changeTaskTitle, changeFilterHandler, removeTodolist,
    addTodoList, changeTodolistTitle
  } = useAppRedux()

  const mappedList = () => {
    return todolists.map((l: TodolistDomainType) => {
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
            changeTaskTitle={changeTaskTitle}
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
export default AppReduxHooks
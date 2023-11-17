import React from 'react';
import "../../style/App.css";
import TodoList from '../../components/TodoList/TodoList';
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import { AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useTasks } from "./hooks/useTasks";
import { useTodolists } from "./hooks/useTodolists";
import { TaskStatuses } from "../../api_DAL/tasks-api";

// export type TodoListsType = {
//   id: string
//   title: string
//   filter: FilterValues
// }

// export type TasksType = {
//   [key: string]: TaskTypeApi[]
// }


// export type FilterValues = "all" | "completed" | "active"


function App() {
  //using hooks
  const { tasks, removeTask, addTask, changeStatus, changeTaskTitle, removeTodolistsSetTasks, addTodoListSetTasks } =
    useTasks()
  //connected 2 hooks together
  const { todoLists, changeFilter, removeTodolist, changeTodolistTitle, addTodoList } =
    useTodolists(removeTodolistsSetTasks, addTodoListSetTasks)

  const mappedList = () => {
    return todoLists.map((l) => {
      let tasksForTodolist = tasks[l.id];
      if (l.filter === 'completed') {
        tasksForTodolist = tasks[l.id].filter(t => t.status === TaskStatuses.Completed);
      }
      if (l.filter === 'active') {
        tasksForTodolist = tasks[l.id].filter(t => t.status === TaskStatuses.New);
      }

      return (<Grid item key={l.id}>
        <Paper sx={{ padding: "20px" }} elevation={3} >
          <TodoList tasks={tasksForTodolist}
            title={l.title}
            removeTask={removeTask}
            addTask={addTask}
            changeStatus={changeStatus}
            todoListId={l.id} filter={l.filter}
            changeFilterHandler={changeFilter}
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
export default App;

import React, { useReducer } from 'react'
import './style/App.css'
import TodoList from '../page/TodoList/TodoList'
import { v1 } from 'uuid'
import { AddItemForm } from '../components/AddItemForm/AddItemForm'
import { AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { TaskPriorities, TaskStatuses, TaskTypeApi } from '../api_DAL/tasks-api'
import { changeTaskStatusAC, changeTaskTitleAC, tasksReducer } from 'reducers/tasksSlice/tasksSlice'
import { FilterValuesType, todolistsReducer } from 'reducers/todolistsSlice/todolistsSlice'

//переделать на санки
const todoListId1 = v1()
const todoListId2 = v1()

function AppReducer() {
  // let [tasks, dispatchTasks] = useReducer(tasksReducer, {
  //   ['todoListId1']: [
  //     //id этот передала пропсами id={l.id}  в  TodoList
  //     {
  //       id: v1(),
  //       title: 'HTML&CSS',
  //       status: TaskStatuses.Completed,
  //       description: '',
  //       completed: true,
  //       priority: TaskPriorities.Low,
  //       startDate: '',
  //       todoListId: todoListId1,
  //       deadline: '',
  //       order: 1,
  //       addedDate: '',
  //     },
  //     {
  //       id: v1(),
  //       title: 'JS',
  //       status: TaskStatuses.Completed,
  //       description: '',
  //       completed: true,
  //       priority: TaskPriorities.Low,
  //       startDate: '',
  //       todoListId: todoListId1,
  //       deadline: '',
  //       order: 1,
  //       addedDate: '',
  //     },
  //     {
  //       id: v1(),
  //       title: 'ReactJS',
  //       status: TaskStatuses.New,
  //       description: '',
  //       completed: true,
  //       priority: TaskPriorities.Low,
  //       startDate: '',
  //       todoListId: todoListId1,
  //       deadline: '',
  //       order: 1,
  //       addedDate: '',
  //     },
  //   ],
  //   ['todoListId2']: [
  //     {
  //       id: v1(),
  //       title: 'Milk',
  //       status: TaskStatuses.Completed,
  //       description: '',
  //       completed: true,
  //       priority: TaskPriorities.Low,
  //       startDate: '',
  //       todoListId: todoListId2,
  //       deadline: '',
  //       order: 1,
  //       addedDate: '',
  //     },
  //     {
  //       id: v1(),
  //       title: 'Juice',
  //       status: TaskStatuses.Completed,
  //       description: '',
  //       completed: true,
  //       priority: TaskPriorities.Low,
  //       startDate: '',
  //       todoListId: todoListId2,
  //       deadline: '',
  //       order: 1,
  //       addedDate: '',
  //     },
  //     {
  //       id: v1(),
  //       title: 'Meat',
  //       status: TaskStatuses.New,
  //       description: '',
  //       completed: true,
  //       priority: TaskPriorities.Low,
  //       startDate: '',
  //       todoListId: todoListId2,
  //       deadline: '',
  //       order: 1,
  //       addedDate: '',
  //     },
  //   ],
  // })

  // let [todoLists, dispatchTodoLists] = useReducer(todolistsReducer, [
  //   //этот стейт для управления  map отрисовки TodoList
  //   {
  //     id: todoListId1,
  //     title: 'What to learn',
  //     filter: 'all',
  //     addedDate: '',
  //     order: 0,
  //     entityStatus: 'idle',
  //   },
  //   {
  //     id: todoListId2,
  //     title: 'What to buy',
  //     filter: 'all',
  //     addedDate: '',
  //     order: 0,
  //     entityStatus: 'idle',
  //   },
  // ])

  // //tasks action creators
  // function removeTask(id: string, todoListId: string) {
  //   // const action = removeTaskAC({ taskId: id, todoListId }) here is redux toolkit now
  //   // dispatchTasks(action)
  // }

  // function addTask(inputValue: string, todoListId: string) {
  //   // const action = addTaskAC(inputValue, todoListId)
  //   // dispatchTasks(action)
  // }

  // function changeStatus(todoListId: string, id: string, status: TaskStatuses) {
  //   const action = changeTaskStatusAC({ todoListId, id, status })
  //   dispatchTasks(action)
  // }

  // function changeTaskTitle(id: string, title: string, todoListId: string) {
  //   const action = changeTaskTitleAC({ id, title, todoListId })
  //   dispatchTasks(action)
  // }

  // // todolists action creators
  // function changeFilterHandler(value: FilterValuesType, todoListId: string) {
  //   // const action = changeFilterTodolistAC({ filter: value, todoListId: todoListId })
  //   // dispatchTodoLists(action)
  // }

  // function removeTodolist(todoListId: string) {
  //   // const action = removeTodolistAC({ todoListId })
  //   // dispatchTodoLists(action)
  //   // dispatchTasks(action)
  // }

  // function addTodoList(input: string) {
  //   //добавление новой колонки списка задач
  //   // const action = addTodolistAC(input)
  //   // dispatchTodoLists(action)
  //   // dispatchTasks(action)
  // }

  // function changeTodolistTitle(title: string, todoListId: string) {
  //   // const action = changeTitleTodolistAC({ title, todoListId })
  //   // dispatchTodoLists(action)
  // }

  // const mappedList = () => {
  //   return todoLists.map((l) => {
  //     let tasksForTodolist = tasks[l.id]
  //     if (l.filter === 'completed') {
  //       tasksForTodolist = tasks[l.id].filter(
  //         (t: TaskTypeApi) => t.status === TaskStatuses.Completed
  //       )
  //     }
  //     if (l.filter === 'active') {
  //       tasksForTodolist = tasks[l.id].filter((t: TaskTypeApi) => t.status === TaskStatuses.New)
  //     }

  //     return (
  //       <Grid item key={l.id}>
  //         <Paper sx={{ padding: '20px' }} elevation={3}>
  //           <TodoList
  //             tasks={tasksForTodolist}
  //             title={l.title}
  //             removeTask={removeTask}
  //             addTask={addTask}
  //             changeStatus={changeStatus}
  //             todoListId={l.id}
  //             filter={l.filter}
  //             changeFilterHandler={changeFilterHandler}
  //             removeTodolist={removeTodolist}
  //             changeTaskTitle={changeTaskTitle}
  //             changeTodolistTitle={changeTodolistTitle}
  //           />
  //         </Paper>
  //       </Grid>
  //     )
  //   })
  // }

  // return (
  //   <div className="App">
  //     <AppBar position="static">
  //       <Toolbar variant="dense">
  //         <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
  //           <Menu />
  //         </IconButton>
  //         <Typography variant="h6" color="inherit" component="div">
  //           Menu
  //         </Typography>
  //       </Toolbar>
  //     </AppBar>
  //     <Container>
  //       <Container maxWidth="sm">
  //         <div className="container">
  //           <AddItemForm addTask={addTodoList} />
  //         </div>
  //       </Container>
  //       <Grid container spacing={7} className="grid">
  //         {mappedList()}
  //       </Grid>
  //     </Container>
  //   </div>
  // )
}
export default AppReducer

import { Container, Grid, Paper } from '@mui/material'
import { TaskStatuses } from '../../api_DAL/tasks-api'
import { memo, useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../state/hooks/hooks-selectors'
import { TodoListRedux } from '../../page/TodoList/TodoListRedux'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { useNavigate } from 'react-router-dom'
import {
  TodolistDomainType,
  addTodolistTC,
  getTodolistTC,
  todolistsSelectors,
} from 'reducers/todolistsSlice/todolistsSlice'
import { TodolistTypeApi } from 'api_DAL/todolists-api'
import { getTasksTC, tasksSelector } from 'reducers/tasksSlice/tasksSlice'
import { useSelector } from 'react-redux'

type TodolistRenderProps = {
  demo: boolean //загрузка мокового state
}

export const TodolistRender: React.FC<TodolistRenderProps> = memo(({ demo = false }) => {
  const todolists = useSelector(todolistsSelectors.selectAppTodolists) //выбираем todolist из стора state
  //TodoListsType[]> означает хотим достать массив todolists из этого типа
  const tasks = useAppSelector(tasksSelector)
  let isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn) //не залогинены
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const addTodoList = useCallback(
    (input: string) => {
      //добавление новой колонки списка задач
      dispatch(addTodolistTC(input))
    },
    [dispatch]
  )

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [isLoggedIn])

  useEffect(() => {
    const getTodos = async () => {
      const res = await dispatch(getTodolistTC())
      if (getTodolistTC.fulfilled.match(res)) {
        const todolists = res.payload.todolists as TodolistTypeApi[]
        todolists.forEach((t: TodolistTypeApi) => {
          dispatch(getTasksTC(t.id))
        })
      }
    }
    getTodos()
  }, [])

  return (
    <Grid container spacing={7} className="grid">
      <Container>
        <div className="container">
          <AddItemForm addTask={addTodoList} />
        </div>
      </Container>
      {todolists.map((l: TodolistDomainType) => {
        let tasksForTodolist = tasks[l.id]
        if (l.filter === 'completed') {
          tasksForTodolist = tasks[l.id].filter((t) => t.status === TaskStatuses.Completed)
        }
        if (l.filter === 'active') {
          tasksForTodolist = tasks[l.id].filter((t) => t.status === TaskStatuses.New)
        }

        return (
          <Grid item key={l.id}>
            <Paper sx={{ padding: '20px' }} elevation={3}>
              <TodoListRedux todolist={l} demo={demo} tasksForTodolist={tasksForTodolist} />
            </Paper>
          </Grid>
        )
      })}
    </Grid>
  )
})

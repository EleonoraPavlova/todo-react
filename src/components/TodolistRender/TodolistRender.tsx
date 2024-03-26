import { Container, Grid, Paper } from '@mui/material'
import { memo, useCallback, useEffect } from 'react'
import { AddItemForm } from '../AddItemForm'
import { useNavigate } from 'react-router-dom'
import { selectTodolists, todolistsThunks } from 'BLL/reducers/todolistsSlice'
import { tasksSelector, tasksThunks } from 'BLL/reducers/tasksSlice'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from 'BLL/reducers/authSlice'
import { useAppDispatch } from 'common/hooks'
import { TodoList } from 'features/page/TodoList'
import { Task, Todolist } from 'common/types'
import { TaskStatuses } from 'common/enums'

type TodolistRenderProps = {
  demo: boolean //загрузка мокового state
}

export const TodolistRender: React.FC<TodolistRenderProps> = memo(({ demo = false }) => {
  const todolists = useSelector(selectTodolists) //выбираем todolist из стора state
  //TodoListsType[]> означает хотим достать массив todolists из этого типа
  const tasks = useSelector(tasksSelector)
  let isLoggedIn = useSelector(selectIsLoggedIn) //не залогинены
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const addTodoList = useCallback(
    (input: string) => {
      //добавление новой колонки списка задач
      dispatch(todolistsThunks.addTodolistTC(input))
    },
    [dispatch]
  )

  useEffect(() => {
    if (!isLoggedIn) navigate('/login')
  }, [isLoggedIn])

  useEffect(() => {
    const getTodos = async () => {
      const res = await dispatch(todolistsThunks.getTodolistTC())
      if (todolistsThunks.getTodolistTC.fulfilled.match(res)) {
        const todolists = res.payload.todolists as Todolist[]
        todolists.forEach((t: Todolist) => {
          dispatch(tasksThunks.getTasksTC(t.id))
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
      {todolists.map((l) => {
        let tasksForTodolist = tasks[l.id] as Task[]
        if (l.filter === 'completed') {
          tasksForTodolist = tasks[l.id].filter((t: Task) => t.status === TaskStatuses.Completed)
        }
        if (l.filter === 'active') {
          tasksForTodolist = tasks[l.id].filter((t: Task) => t.status === TaskStatuses.New)
        }

        return (
          <Grid item key={l.id}>
            <Paper sx={{ padding: '20px' }} elevation={3}>
              <TodoList todolist={l} demo={demo} tasksForTodolist={tasksForTodolist} />
            </Paper>
          </Grid>
        )
      })}
    </Grid>
  )
})

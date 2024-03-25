import { Container, Grid, Paper } from '@mui/material'
import { memo, useCallback, useEffect } from 'react'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { useNavigate } from 'react-router-dom'
import { addTodolistTC, getTodolistTC, selectTodolists } from 'reducers/todolistsSlice'
import { tasksSelector, tasksThunks } from 'reducers/tasksSlice/tasksSlice'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from 'reducers/authSlice/authSlice'
import { useAppDispatch } from 'common/hooks'
import { TodoList } from 'features/page/TodoList/TodoList'
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
      dispatch(addTodolistTC(input))
    },
    [dispatch]
  )

  useEffect(() => {
    if (!isLoggedIn) navigate('/login')
  }, [isLoggedIn])

  useEffect(() => {
    const getTodos = async () => {
      const res = await dispatch(getTodolistTC())
      if (getTodolistTC.fulfilled.match(res)) {
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

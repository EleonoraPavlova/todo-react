import { Box, Container, Grid, Paper } from '@mui/material'
import { memo, useCallback, useEffect } from 'react'
import { AddItemForm } from '../AddItemForm'
import { useNavigate } from 'react-router-dom'
import { selectTodolists, todolistsThunks } from 'BLL/reducers/todolistsSlice'
import { tasksSelector, tasksThunks } from 'BLL/reducers/tasksSlice'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from 'BLL/reducers/authSlice'
import { useActions } from 'common/hooks'
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

  const { addTodolistTC, getTodolistTC } = useActions(todolistsThunks)
  const { getTasksTC } = useActions(tasksThunks)

  const navigate = useNavigate()

  const addTodoList = useCallback(
    (input: string) => {
      addTodolistTC(input)
    },
    [addTodolistTC]
  )

  useEffect(() => {
    if (!isLoggedIn) navigate('/login')
  }, [isLoggedIn])

  useEffect(() => {
    const getTodos = async () => {
      const res = await getTodolistTC()
      if (todolistsThunks.getTodolistTC.fulfilled.match(res)) {
        const todolists = res.payload.todolists as Todolist[]
        todolists.forEach((t: Todolist) => {
          getTasksTC(t.id)
        })
      }
    }
    getTodos()
  }, [])

  return (
    <>
      <Container>
        <Box sx={{ padding: '45px 10px 5px 0px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AddItemForm addTask={addTodoList} />
        </Box>
      </Container>
      <Grid
        container
        sx={{
          margin: '10px 0',
          justifyContent: 'center',
          flexWrap: 'nowrap',
          overflowX: 'scroll',
          paddingLeft: '102%',
          height: '70vh',
        }}>
        {todolists.map((l) => {
          let tasksForTodolist = tasks[l.id] as Task[]
          if (l.filter === 'completed') {
            tasksForTodolist = tasks[l.id].filter((t: Task) => t.status === TaskStatuses.Completed)
          }
          if (l.filter === 'active') {
            tasksForTodolist = tasks[l.id].filter((t: Task) => t.status === TaskStatuses.New)
          }

          return (
            <Grid item key={l.id} sx={{ padding: '19px 15px 0 0' }}>
              <Paper sx={{ padding: '18px', width: '240px' }} elevation={1}>
                <TodoList todolist={l} demo={demo} tasksForTodolist={tasksForTodolist} />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
})

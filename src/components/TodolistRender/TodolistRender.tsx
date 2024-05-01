import { Box } from '@mui/material'
import { AddItemForm } from '../AddItemForm'
import { useTodolistRender } from './hooks/useTodolistRender'
import { TodolistsMap } from 'components/TodolistsMap/TodolistsMap'

type Props = {
  demo?: boolean //mock state
  lightMode: boolean
}

export const TodolistRender: React.FC<Props> = ({ demo = false, lightMode }) => {
  const { addTodoList } = useTodolistRender()

  return (
    <>
      <Box>
        <Box sx={{ padding: '45px 10px 5px 0px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {lightMode ? (
            <AddItemForm addTask={addTodoList} label={"Todolist's name"} />
          ) : (
            <Box
              sx={{
                width: '280px',
                height: '70px',
                backgroundColor: '#1e1e1e',
                borderRadius: '5px',
                padding: '15px 0 15px 45px',
              }}>
              <AddItemForm addTask={addTodoList} label={"Todolist's name"} />
            </Box>
          )}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', overflow: 'auto', padding: '0 0 40px 5px' }}>
        <TodolistsMap />
      </Box>
    </>
  )
}

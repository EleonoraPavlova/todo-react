import React from 'react'
import { Box } from '@mui/material'
import { startStateTasks, todoListId2 } from '../../state/initialState/tasksStartState'
import { Provider } from 'react-redux'
import { storyBookStore } from '../../stories/decorators/ReduxStoreProviderDecorator'
import { TaskMap } from './TaskMap'

export default {
  title: 'Task',
  component: TaskMap,
}

const tasks = startStateTasks

export const TaskBase = () => {
  return (
    <Provider store={storyBookStore}>
      <Box sx={{ width: '200px' }}>
        <TaskMap task={tasks[todoListId2][1]} />
      </Box>
    </Provider>
  )
}

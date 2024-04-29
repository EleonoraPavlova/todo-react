import { List } from '@mui/material'
import { Task } from 'common/types'
import { TaskMap } from 'components/TaskMap'

type Props = {
  tasksForTodolist: Task[]
}

export const Tasks: React.FC<Props> = ({ tasksForTodolist }) => {
  const mappedTasks = () => {
    if (tasksForTodolist.length) {
      return tasksForTodolist.map((task) => <TaskMap key={task.id} task={task} />)
    } else {
      return <h5 style={{ textAlign: 'center' }}>No tasks yet</h5>
    }
  }
  return <List>{mappedTasks()}</List>
}

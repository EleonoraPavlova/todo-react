import { TaskStatuses } from 'common/enums'
import { useAppDispatch } from 'common/hooks'
import { Task } from 'common/types'
import { ChangeEvent, useCallback } from 'react'
import { tasksThunks } from 'reducers/tasksSlice/tasksSlice'

export function useTask(task: Task) {
  let { todoListId, id } = task
  const dispatch = useAppDispatch()

  const onRemoveHandler = useCallback(() => {
    dispatch(tasksThunks.removeTaskTC({ todoListId, taskId: id }))
  }, [dispatch, todoListId, id])

  const changeTaskStatus = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let currentStatus = e.currentTarget.checked
      const newStatus = currentStatus ? TaskStatuses.Completed : TaskStatuses.New
      dispatch(tasksThunks.updateTaskTC({ todoListId, taskId: id, domainModel: { status: newStatus } }))
    },
    [dispatch, todoListId, id]
  )

  const changeTaskTitle = useCallback(
    (title: string) => {
      dispatch(tasksThunks.updateTaskTC({ todoListId, taskId: id, domainModel: { title } }))
    },
    [dispatch, todoListId, id]
  )
  return { onRemoveHandler, changeTaskStatus, changeTaskTitle }
}

import React, { ChangeEvent, memo, useCallback } from 'react'
import { ListItem, Checkbox, IconButton } from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import Delete from '@mui/icons-material/Delete'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import styled from '../../features/page/TodoList/TodoList.module.scss'
import { TaskStatuses, Task } from '../../api_DAL/tasks-api'
import s from './TaskMap.module.scss'
import { tasksThunks } from 'reducers/tasksSlice/tasksSlice'
import { useAppDispatch } from 'common/hooks'
import { useTask } from './hooks/useTask'

type TaskProps = {
  task: Task
}

export const TaskMap: React.FC<TaskProps> = memo(({ task }) => {
  let { status, title } = task

  const { onRemoveHandler, changeTaskStatus, changeTaskTitle } = useTask(task)

  return (
    <ListItem
      sx={{ justifyContent: 'space-between' }}
      className={`${styled.list} ${status === TaskStatuses.Completed ? styled.done : ''}`}>
      <Checkbox
        checked={status === TaskStatuses.Completed}
        onChange={changeTaskStatus}
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
        color="success"
        disabled={status === TaskStatuses.InProgress}
      />
      <EditableSpan
        value={title}
        additionalClass={s.additionalClassTask}
        onChange={changeTaskTitle}
        isDone={status === TaskStatuses.Completed}
        disabled={status === TaskStatuses.InProgress}
      />
      <IconButton
        aria-label="delete"
        onClick={onRemoveHandler}
        size="small"
        disabled={status === TaskStatuses.InProgress}>
        <Delete fontSize="inherit" />
      </IconButton>
    </ListItem>
  )
})

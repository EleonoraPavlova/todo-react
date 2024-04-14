import React, { memo } from 'react'
import { ListItem, Checkbox, IconButton } from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import Delete from '@mui/icons-material/Delete'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import styled from '../../features/page/TodoList/TodoList.module.scss'
import s from './TaskMap.module.scss'
import { useTask } from './hooks/useTask'
import { Task } from 'common/types'
import { TaskStatuses } from 'common/enums'

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
        disabled={status === TaskStatuses.InProgress}
        isDone={status === TaskStatuses.Completed}
      />
      <IconButton
        aria-label="delete"
        onClick={onRemoveHandler}
        size="small"
        disabled={status === TaskStatuses.InProgress || status === TaskStatuses.Completed}>
        <Delete fontSize="inherit" />
      </IconButton>
    </ListItem>
  )
})

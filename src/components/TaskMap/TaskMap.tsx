import React from 'react'
import { ListItem, Checkbox, IconButton } from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import Delete from '@mui/icons-material/Delete'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import s from './TaskMap.module.scss'
import { useTask } from './hooks/useTask'
import { Task } from 'common/types'
import { TaskStatuses } from 'common/enums'

type Props = {
  task: Task
}

export const TaskMap: React.FC<Props> = ({ task }) => {
  let { status, title } = task

  const { onRemoveHandler, changeTaskStatus, changeTaskTitle } = useTask(task)
  const progress = status === TaskStatuses.InProgress
  const completed = status === TaskStatuses.Completed

  return (
    <ListItem sx={{ justifyContent: 'space-between' }} className={`${s.list} ${completed || progress ? s.done : ''}`}>
      <Checkbox
        checked={completed}
        onChange={changeTaskStatus}
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
        color="success"
        disabled={progress}
      />
      <EditableSpan
        value={title}
        additionalClass={s.additionalClassTask}
        onChange={changeTaskTitle}
        disabled={progress}
        isDone={completed || progress}
      />
      <IconButton aria-label="delete" onClick={onRemoveHandler} size="small" disabled={progress || completed}>
        <Delete fontSize="inherit" />
      </IconButton>
    </ListItem>
  )
}

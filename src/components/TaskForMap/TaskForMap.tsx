import React, { ChangeEvent, memo, useCallback } from 'react';
import { ListItem, Checkbox, IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Delete from "@mui/icons-material/Delete";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import styled from "../../page/TodoList/TodoList.module.scss"
import { TaskStatuses, TaskTypeApi } from "../../api_DAL/tasks-api";
import { useAppDispatch } from "../../state/hooks/hooks-selectors";
import { removeTaskTC, updateTaskTC } from "../../state/tasks-reducers/tasks-reducer";
import s from "./TaskForMap.module.scss";


type TaskForMapType = {
  task: TaskTypeApi
}

export const TaskForMap: React.FC<TaskForMapType> = memo(({ task }) => {
  let { todoListId, id, status, title } = task
  const dispatch = useAppDispatch()

  const onRemoveHandler = useCallback(() => {
    dispatch(removeTaskTC({ todoListId, taskId: id }))
  }, [dispatch, todoListId, id])

  const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let currentStatus = e.currentTarget.checked
    const newStatus = currentStatus ? TaskStatuses.Completed : TaskStatuses.New;
    dispatch(updateTaskTC({ todoListId, id, apiModal: { status: newStatus } }))
  }, [dispatch, todoListId, id])

  const changeTaskTitle = useCallback((title: string) => {
    dispatch(updateTaskTC({ todoListId, id, apiModal: { title } }))
  }, [dispatch, todoListId, id]);

  return (
    <ListItem sx={{ justifyContent: "space-between" }}
      className={`${styled.list} ${status === TaskStatuses.Completed ? styled.done : ""}`} >
      <Checkbox checked={status === TaskStatuses.Completed} onChange={changeTaskStatus}
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
        color="success"
        disabled={status === TaskStatuses.InProgress}
      />
      <EditableSpan value={title}
        additionalClass={s.additionalClassTask}
        onChange={changeTaskTitle}
        isDone={status === TaskStatuses.Completed}
        disabled={status === TaskStatuses.InProgress} />
      <IconButton aria-label="delete" onClick={onRemoveHandler} size="small" disabled={status === TaskStatuses.InProgress}>
        <Delete fontSize="inherit" />
      </IconButton>
    </ListItem>
  );
});

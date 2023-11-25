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


type TaskForMapType = {
  task: TaskTypeApi;
};

export const TaskForMap: React.FC<TaskForMapType> = memo(({ task }) => {
  const dispatch = useAppDispatch()

  const onRemoveHandler = useCallback(() => {
    dispatch(removeTaskTC(task.todoListId, task.id))
  }, [dispatch, task.todoListId, task.id])

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let currentStatus = e.currentTarget.checked
    const newStatus = currentStatus ? TaskStatuses.Completed : TaskStatuses.New;
    dispatch(updateTaskTC(task.todoListId, task.id, { status: newStatus }))
  }, [dispatch, task.todoListId, task.id])

  const changeTaskTitle = useCallback((title: string) => {
    dispatch(updateTaskTC(task.todoListId, task.id, { title }))
  }, [dispatch, task.todoListId, task.id]);

  return (
    <ListItem sx={{ justifyContent: "space-between" }}
      className={`${styled.list} ${task.status === TaskStatuses.Completed ? styled.done : ""}`} >
      <Checkbox checked={task.status === TaskStatuses.Completed} onChange={onChangeHandler}
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
        color="success"
      />
      <EditableSpan value={task.title} onChange={changeTaskTitle} />
      <IconButton aria-label="delete" onClick={onRemoveHandler} size="small" >
        <Delete fontSize="inherit" />
      </IconButton>
    </ListItem>
  );
});

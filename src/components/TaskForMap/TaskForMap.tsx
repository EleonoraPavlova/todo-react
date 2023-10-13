import React, { ChangeEvent, memo, useCallback } from 'react';
import { ListItem, Checkbox, IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Delete from "@mui/icons-material/Delete";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import styled from "../TodoList/TodoList.module.scss"
import { Task } from "../TodoList/TodoList";

type TaskType = {
  task: Task;
  todoListId: string;
  removeTask: (taskId: string, todoListId: string) => void;
  changeStatus: (todoListId: string, taskId: string, isDone: boolean) => void;
  changeEditableSpan: (taskId: string, title: string, todoListId: string) => void;
};

export const TaskForMap: React.FC<TaskType> = memo((props: TaskType) => {
  console.log("TaskForMap");

  const onRemoveHandler = () => props.removeTask(props.task.id, props.todoListId);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    props.changeStatus(props.todoListId, props.task.id, e.currentTarget.checked);

  const EditableSpanHandler = useCallback((input: string) => {
    props.changeEditableSpan(props.task.id, input, props.todoListId);
  }, [props.changeEditableSpan, props.task.id, props.todoListId]);

  return (
    <ListItem sx={{ justifyContent: "space-between" }}
      className={`${styled.list} ${props.task.isDone ? styled.done : ""}`} >
      <Checkbox checked={props.task.isDone} onChange={onChangeHandler}
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
        color="success"
      />
      <EditableSpan value={props.task.title} onChange={EditableSpanHandler} />
      <IconButton aria-label="delete" onClick={onRemoveHandler} size="small" >
        <Delete fontSize="inherit" />
      </IconButton>
    </ListItem>
  );
});

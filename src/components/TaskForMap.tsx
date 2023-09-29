import React, { ChangeEvent, memo, useCallback } from 'react';
import { ListItem, Checkbox, IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Delete from "@mui/icons-material/Delete";
import { EditableSpan } from "./EditableSpan";
import styled from "./TodoList/TodoList.module.scss"
import { Task } from "./TodoList/TodoList";

type TaskType = {
  task: Task;
  todoListId: string;
  removeTask: (taskId: string, todoListId: string) => void;
  changeStatus: (todoListId: string, taskId: string, isDone: boolean) => void;
  changeEditableSpan: (taskId: string, title: string, todoListId: string) => void;
};

export const TaskForMap: React.FC<TaskType> = memo((
  { task, todoListId, removeTask, changeStatus, changeEditableSpan }: TaskType
) => {
  console.log("TaskForMap");

  const onRemoveHandler = () => removeTask(task.id, todoListId);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    changeStatus(todoListId, task.id, e.currentTarget.checked);

  const EditableSpanHandler = useCallback((input: string) => {
    changeEditableSpan(task.id, input, todoListId);
  }, [task.id, todoListId]);

  return (
    <ListItem sx={{ justifyContent: "space-between" }}
      key={task.id}
      className={`${styled.list} ${task.isDone ? styled.done : ""}`} >
      <Checkbox checked={task.isDone} onChange={onChangeHandler}
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
        color="success"
      />
      <EditableSpan title={task.title} onChange={EditableSpanHandler} />
      <IconButton aria-label="delete" onClick={onRemoveHandler} size="small" >
        <Delete fontSize="inherit" />
      </IconButton>
    </ListItem>
  );
});

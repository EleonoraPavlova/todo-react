import React, { ChangeEvent, memo, useCallback } from 'react';
import { ListItem, Checkbox, IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Delete from "@mui/icons-material/Delete";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import styled from "../TodoList/TodoList.module.scss"
import { TaskStatuses, TaskTypeApi } from "../../api/tasks-api";


type TaskForMap = {
  task: TaskTypeApi;
  todoListId: string;
  removeTask: (taskId: string, todoListId: string) => void;
  changeStatus: (todoListId: string, taskId: string, status: TaskStatuses) => void;
  changeEditableSpan: (taskId: string, title: string, todoListId: string) => void;
};

export const TaskForMap: React.FC<TaskForMap> = memo((props: TaskForMap) => {
  console.log("TaskForMap");

  const onRemoveHandler = () => props.removeTask(props.task.id, props.todoListId);

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => { //подебажить на useCallback
    let newStatusValue = e.currentTarget.checked
    props.changeStatus(props.todoListId, props.task.id, newStatusValue ? TaskStatuses.Completed : TaskStatuses.New);
  }, [props.changeStatus])

  const EditableSpanHandler = useCallback((input: string) => {
    props.changeEditableSpan(props.task.id, input, props.todoListId);
  }, [props.changeEditableSpan, props.task.id, props.todoListId]);

  return (
    <ListItem sx={{ justifyContent: "space-between" }}
      className={`${styled.list} ${props.task.status === TaskStatuses.Completed ? styled.done : ""}`} >
      <Checkbox checked={props.task.status === TaskStatuses.Completed} onChange={onChangeHandler}
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

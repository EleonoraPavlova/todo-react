import React, { ChangeEvent, useState } from 'react';
import styled from "./TodoList.module.scss"
import { FilterValues } from "../../App";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { EditableSpan } from "../EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';


type TodoListProps = {
  title: string
  tasks: Task[]
  id: string // id из конкретно каждого массива, который лежит в объекте
  filter: FilterValues
  removeTask: (id: string, togoListId: string) => void
  addTask: (inputValue: string, togoListId: string) => void
  changeStatus: (togoListId: string, taskId: string, isDone: boolean) => void
  changeFilterHandler: (value: FilterValues, id: string) => void
  removeTodolist: (togoListId: string) => void
  changeEditableSpan: (id: string, input: string, togoListId: string) => void
  changeEditableSpanTitle: (input: string, togoListId: string) => void
}

export type Task = {
  id: string
  title: string
  isDone: boolean
}



function TodoList(props: TodoListProps) {
  const mappedTasks = () => {
    return props.tasks.map(item => {

      const onRemoveHandler = () => props.removeTask(item.id, props.id)
      const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
        props.changeStatus(props.id, item.id, e.currentTarget.checked);
      //console.log(e.currentTarget.checked) //вывожу в консоль смену состояния чеков

      const EditableSpanHandler = (input: string) => {
        props.changeEditableSpan(item.id, input, props.id);
      }
      return (<li key={item.id} className={`${styled.list} ${item.isDone ? styled.done : ""}`} >
        <Checkbox checked={item.isDone} onChange={onChangeHandler}
          icon={<BookmarkBorderIcon />}
          checkedIcon={<BookmarkIcon />}
          color="success"
        />
        <EditableSpan title={item.title} onChange={EditableSpanHandler} />
        <IconButton aria-label="delete" onClick={onRemoveHandler} size="small" >
          <Delete fontSize="inherit" />
        </IconButton>
      </li>)
    })
  }

  const removeTodolistHandler = () => {
    return props.removeTodolist(props.id)
  }

  const addTasks = (input: string) => {
    props.addTask(input, props.id)
  }

  const EditableSpanTitleHandler = (title: string) => {
    props.changeEditableSpanTitle(title, props.id);
  }

  return (
    <div>
      <EditableSpan title={props.title} onChange={EditableSpanTitleHandler} />
      <IconButton aria-label="delete" onClick={removeTodolistHandler} size="small" >
        <Delete />
      </IconButton>
      {/* <ButtonComponent name="remove" callBack={removeTodolistHandler} /> */}
      <AddItemForm addTask={addTasks} />
      <ul>
        {mappedTasks()}
      </ul>
      <div>
        <Button size="small" variant={props.filter === "all" ? "contained" : "text"}
          children={"All"}
          onClick={() => { props.changeFilterHandler("all", props.id) }} className="button" />
        <Button size="small" color={"primary"}
          variant={props.filter === "active" ? "contained" : "text"} children={"Active"}
          onClick={() => { props.changeFilterHandler("active", props.id) }} className="button" />
        <Button size="small" color={"secondary"}
          variant={props.filter === "completed" ? "contained" : "text"}
          children={"Completed"} onClick={() => { props.changeFilterHandler("completed", props.id) }}
          className="button" />
      </div>
    </div >
  );
}
// active={props.filter === "all"} 
// active={props.filter === "active"}
//active={props.filter === "completed"}
export default TodoList;
//sx={{ mr: "4px" }}  писать стили в компроненте прям так
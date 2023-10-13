import React, { memo, useCallback, useMemo } from 'react';
import { FilterValues } from "../../apps/AppRedux/AppRedux";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { Button, IconButton, List } from "@mui/material";
import { Box } from '@mui/system';
import { Delete } from "@mui/icons-material";
import { TaskForMap } from "../TaskForMap/TaskForMap";


type TodoListProps = {
  title: string
  tasks: Task[]
  todoListId: string // id из конкретно каждого массива, который лежит в объекте
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


export const TodoList = memo((props: TodoListProps) => {
  console.log("TodoList has been called")

  let tasksForTodolist = useMemo(() => {
    if (props.filter === 'completed') {
      return props.tasks.filter(t => t.isDone);
    }
    if (props.filter === 'active') {
      return props.tasks.filter(t => !t.isDone);
    }
    return props.tasks
  }, [props.filter, props.tasks])


  const mappedTasks = () => {
    return tasksForTodolist.map(task =>
    (<TaskForMap
      key={task.id}
      task={task}
      todoListId={props.todoListId}
      removeTask={props.removeTask}
      changeStatus={props.changeStatus}
      changeEditableSpan={props.changeEditableSpan} />))
  }

  const removeTodolistHandler = useCallback(() => {
    props.removeTodolist(props.todoListId)
  }, [props.removeTodolist, props.todoListId])

  const addTasks = useCallback((input: string) => {
    props.addTask(input, props.todoListId)
  }, [props.addTask, props.todoListId]) //пропсы добавляем в зависомость!

  const EditableSpanTitleHandler = useCallback((title: string) => {
    props.changeEditableSpanTitle(title, props.todoListId);
  }, [props.changeEditableSpanTitle, props.todoListId])

  return (
    <div>
      <Box component={"div"} sx={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "space-between" }}>
        <EditableSpan value={props.title} onChange={EditableSpanTitleHandler} />
        <IconButton aria-label="delete" onClick={removeTodolistHandler} size="small" >
          <Delete />
        </IconButton>
      </Box>
      <AddItemForm addTask={addTasks} />
      <List>
        {mappedTasks()}
      </List>
      <div>
        <Button size="small" variant={props.filter === "all" ? "contained" : "text"}
          children={"All"}
          onClick={() => { props.changeFilterHandler("all", props.todoListId) }} className="button" />
        <Button size="small" color={"primary"}
          variant={props.filter === "active" ? "contained" : "text"} children={"Active"}
          onClick={() => { props.changeFilterHandler("active", props.todoListId) }} className="button" />
        <Button size="small" color={"secondary"}
          variant={props.filter === "completed" ? "contained" : "text"}
          children={"Completed"} onClick={() => { props.changeFilterHandler("completed", props.todoListId) }}
          className="button" />
      </div>
    </div >
  );
})
// active={props.filter === "all"} 
// active={props.filter === "active"}
//active={props.filter === "completed"}
export default TodoList;
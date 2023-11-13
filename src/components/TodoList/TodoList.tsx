import React, { memo, useCallback, useMemo } from 'react';
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { Button, IconButton, List } from "@mui/material";
import { Box } from '@mui/system';
import { Delete } from "@mui/icons-material";
import { TaskForMap } from "../TaskForMap/TaskForMap";
import { TaskStatuses, TaskTypeApi } from "../../api/tasks-api";
import { FilterValuesType } from "../../state/todoList-reducers/todolists-reducer";


type TodoListProps = {
  title: string
  tasks: TaskTypeApi[]
  todoListId: string // id из конкретно каждого массива, который лежит в объекте
  filter: FilterValuesType
  removeTask: (id: string, togoListId: string) => void
  addTask: (inputValue: string, togoListId: string) => void
  changeStatus: (togoListId: string, taskId: string, status: TaskStatuses) => void
  changeFilterHandler: (value: FilterValuesType, id: string) => void
  removeTodolist: (togoListId: string) => void
  changeEditableSpan: (id: string, input: string, togoListId: string) => void
  changeTodolistTitle: (input: string, togoListId: string) => void
}

// export type Task = {
//   id: string
//   title: string
//   isDone: boolean
// }


export const TodoList: React.FC<TodoListProps> = memo((props: TodoListProps) => {
  console.log("TodoList has been called")

  let tasksForTodolist = useMemo(() => {
    if (props.filter === 'completed') {
      return props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }
    if (props.filter === 'active') {
      return props.tasks.filter(t => t.status === TaskStatuses.New);
    }
    return props.tasks
  }, [props.filter, props.tasks])

  console.log("tasksForTodolist", tasksForTodolist)

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
    const { removeTodolist, todoListId } = props
    removeTodolist(todoListId)
  }, [props])

  const addTasks = useCallback((input: string) => {
    const { addTask, todoListId } = props
    addTask(input, todoListId)
  }, [props]) //пропсы добавляем в зависомость!

  const EditableSpanTitleHandler = useCallback((title: string) => {
    const { changeTodolistTitle, todoListId } = props
    changeTodolistTitle(title, todoListId)
  }, [props])

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
      <div style={{ display: "flex", gap: "15px" }}>
        <Button size="small" variant={props.filter === "all" ? "contained" : "text"}
          children={"All"}
          onClick={() => { props.changeFilterHandler("all", props.todoListId) }} className="button" />
        <Button size="small" color={"success"}
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
export default TodoList;
import React, { memo, useCallback, useEffect } from 'react';
import { TaskForMap } from "../../components/TaskForMap/TaskForMap";
import { FilterValuesType, TodolistDomainType, changeFilterTodolistTC, changeTitleTodolistTC, removeTodolistTC } from "../../state/todoList-reducers/todolists-reducer";
import { addTaskTC, getTasksTC } from "../../state/tasks-reducers/tasks-reducer";
import { useAppDispatch, } from "../../state/hooks/hooks-selectors";
import { Box, Button, IconButton, List } from "@mui/material";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import { Delete } from "@mui/icons-material";
import { EditableSpan } from "../../components/EditableSpan/EditableSpan";
import { TaskTypeApi } from "../../api_DAL/tasks-api";


type TodoListReduxProps = {
  todolist: TodolistDomainType
  tasksForTodolist: TaskTypeApi[]
}

export const TodoListRedux: React.FC<TodoListReduxProps> = memo(({ todolist, tasksForTodolist }) => {
  let { id, filter, title } = todolist // что входит todoLists пропсы,
  // ПИСАТЬ НУЖНО ТО, ЧТО НУЖНО ВЫТЯНУТЬ ИЗ state - разворачивание объекта todoLists
  //const tasks = useAppSelector<TasksObjType>(state => state.tasks)
  const dispatch = useAppDispatch()

  useEffect(() => { //download all todolists from api when loading the component
    dispatch(getTasksTC(id))
  }, [id]) //пустой [] - отрабатывает один раз при загрузке страницы!

  const mappedTasks = () => {
    return tasksForTodolist.map((task) => (
      <TaskForMap
        key={task.id}
        task={task}
      />
    ))
  }

  const removeTodolist = useCallback(() => {
    dispatch(removeTodolistTC(id))
  }, [dispatch])

  const addTasks = useCallback((title: string) => {
    dispatch(addTaskTC(title, id))
  }, [dispatch, id])

  const changeTodolistTitle = useCallback((title: string) => {
    dispatch(changeTitleTodolistTC(id, title))
  }, [dispatch])


  const changeTodoListFilter = useCallback((todoListId: string, filter: FilterValuesType) => {
    const thunk = changeFilterTodolistTC(todoListId, title, filter)
    dispatch(thunk)
  }, [dispatch, title])

  const changeFilterAll = useCallback(() => { changeTodoListFilter(id, "all") }, [changeTodoListFilter, id])
  const changeFilterActive = useCallback(() => { changeTodoListFilter(id, "active") }, [changeTodoListFilter, id])
  const changeFilterCompleted = useCallback(() => { changeTodoListFilter(id, "completed") }, [changeTodoListFilter, id])

  return (
    <div>
      <Box component={"div"} sx={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "space-between" }}>
        <EditableSpan value={title} onChange={changeTodolistTitle} />
        <IconButton aria-label="delete" onClick={removeTodolist} size="small" >
          <Delete />
        </IconButton>
      </Box>
      <AddItemForm addTask={addTasks} />
      <List>
        {mappedTasks()}
      </List>
      <div style={{ display: "flex", gap: "15px" }}>
        <Button size="small" variant={filter === "all" ? "contained" : "text"}
          children={"All"}
          onClick={changeFilterAll} className="button" />
        <Button size="small" color={"success"}
          variant={filter === "active" ? "contained" : "text"} children={"Active"}
          onClick={changeFilterActive} className="button" />
        <Button size="small" color={"secondary"}
          variant={filter === "completed" ? "contained" : "text"}
          children={"Completed"} onClick={changeFilterCompleted}
          className="button" />
      </div>
    </div >
  );
})
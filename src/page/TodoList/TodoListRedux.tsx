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
import s from "./TodoList.module.scss";


type TodoListReduxProps = {
  todolist: TodolistDomainType
  tasksForTodolist: TaskTypeApi[]
  demo: boolean //загрузка мокового state
}

export const TodoListRedux: React.FC<TodoListReduxProps> = memo(({ demo = false, todolist, tasksForTodolist }) => {
  let { id, filter, title, entityStatus } = todolist // что входит todoLists пропсы,
  // ПИСАТЬ НУЖНО ТО, ЧТО НУЖНО ВЫТЯНУТЬ ИЗ state - разворачивание объекта todoLists
  //const tasks = useAppSelector<TasksObjType>(state => state.tasks)
  let disabledFor = entityStatus === "loading"
  const dispatch = useAppDispatch()

  useEffect(() => { //download all todolists from api when loading the component
    if (demo) return
    dispatch(getTasksTC(id));
  }, []) //пустой [] - отрабатывает один раз при загрузке страницы!

  const mappedTasks = () => {
    return tasksForTodolist.map((task) => (
      <TaskForMap
        disabled={disabledFor}
        key={task.id}
        task={task}
      />
    ))
  }

  const removeTodolist = useCallback(() => {
    dispatch(removeTodolistTC(id))
  }, [dispatch, id])

  const addTasks = useCallback((title: string) => {
    dispatch(addTaskTC(title, id))
  }, [dispatch, id])

  const changeTodolistTitle = useCallback((title: string) => {
    dispatch(changeTitleTodolistTC(id, title))
  }, [dispatch])


  const changeTodoListFilter = useCallback((todoListId: string, filter: FilterValuesType) => {
    dispatch(changeFilterTodolistTC(todoListId, title, filter))
  }, [dispatch, title])

  const changeFilterAll = useCallback(() => { changeTodoListFilter(id, "all") }, [changeTodoListFilter, id])
  const changeFilterActive = useCallback(() => { changeTodoListFilter(id, "active") }, [changeTodoListFilter, id])
  const changeFilterCompleted = useCallback(() => { changeTodoListFilter(id, "completed") }, [changeTodoListFilter, id])

  return (
    <div className={s.todolist}>
      <Box component={"div"}
        sx={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "space-between" }}
      >
        <EditableSpan value={title} onChange={changeTodolistTitle}
          additionalClass={s.additionalClass}
        />
        <IconButton aria-label="delete"
          size="small"
          disabled={disabledFor}
          onClick={removeTodolist} >
          <Delete />
        </IconButton>
      </Box>
      <AddItemForm addTask={addTasks} disabled={disabledFor} />
      <List>
        {mappedTasks()}
      </List>
      <div style={{ display: "flex", gap: "15px" }}>
        <Button size="small" variant={filter === "all" ? "contained" : "text"}
          children={"All"} disabled={disabledFor}
          onClick={changeFilterAll} className="button" />
        <Button size="small" color={"success"}
          variant={filter === "active" ? "contained" : "text"}
          children={"Active"} disabled={disabledFor}
          onClick={changeFilterActive} className="button" />
        <Button size="small" color={"secondary"}
          variant={filter === "completed" ? "contained" : "text"}
          disabled={disabledFor}
          children={"Completed"} onClick={changeFilterCompleted}
          className="button" />
      </div>
    </div >
  );
})
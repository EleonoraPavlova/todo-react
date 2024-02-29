import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { TaskStatuses } from '../../../api_DAL/tasks-api'
import {  FilterValuesType, addTodolistTC, todolistsSelectors } from 'reducers/todolistsSlice/todolistsSlice'
import { addTaskTC, changeTaskStatusAC, changeTaskTitleAC, tasksSelector } from 'reducers/tasksSlice/tasksSlice'

export function useAppRedux() {
  const dispatch = useDispatch()
  const todolists = useSelector(todolistsSelectors.selectAppTodolists)//выбираем todolist из стора state
  //<AppRootState, TodolistDomainType[]> означает хотим достать массив todolists из этого типа
  const tasks = useSelector(tasksSelector)

  const removeTask = useCallback(
    (id: string, todoListId: string) => {
      // const action = removeTaskAC({ taskId: id, todoListId }) here is redux toolkit now
      // dispatch(action)
    },
    [dispatch]
  )

  const addTask = useCallback(
    (title: string, todoListId: string) => {
      const thunk = addTaskTC({ title, todoListId }) as any
      dispatch(thunk)
    },
    [dispatch]
  )

  const changeStatus = useCallback(
    (todoListId: string, id: string, status: TaskStatuses) => {
      const action = changeTaskStatusAC({ todoListId, id, status })
      dispatch(action)
    },
    [dispatch]
  )

  const changeTaskTitle = useCallback(
    (id: string, title: string, todoListId: string) => {
      const action = changeTaskTitleAC({ id, title, todoListId })
      dispatch(action)
    },
    [dispatch]
  )

  // todolists action creators
  const changeFilterHandler = useCallback(
    (value: FilterValuesType, todoListId: string) => {
      // const action = changeFilterTodolistAC({ filter: value, todoListId: todoListId })
      // dispatch(action)
    },
    [dispatch]
  )

  const removeTodolist = useCallback(
    (todoListId: string) => {
      // const action = removeTodolistAC({ todoListId })
      // dispatch(action)
    },
    [dispatch]
  )

  const addTodoList = useCallback(
    (input: string) => {
      //добавление новой колонки списка задач
      const thunk = addTodolistTC(input) as any
      dispatch(thunk)
    },
    [dispatch]
  )

  const changeTodolistTitle = useCallback(
    (title: string, todoListId: string) => {
      // const action = changeTitleTodolistAC({ title, todoListId })
      // dispatch(action)
    },
    [dispatch]
  )

  return {
    todolists,
    tasks,
    removeTask,
    addTask,
    changeStatus,
    changeTaskTitle,
    changeFilterHandler,
    removeTodolist,
    addTodoList,
    changeTodolistTitle,
  }
}

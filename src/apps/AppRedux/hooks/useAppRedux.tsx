import { useDispatch, useSelector } from "react-redux"
import { AppRootState } from "../../../state/storeBLL"
import { useCallback } from "react"
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, addTaskTC } from "../../../state/tasks-reducers/tasks-reducer"
import { FilterValuesType, changeFilterTodolistAC, changeTitleTodolistAC, removeTodolistAC, TodolistDomainType, addNewTodolistTC } from "../../../state/todoList-reducers/todolists-reducer"
import { TaskStatuses, TasksObjType } from "../../../api_DAL/tasks-api"

export function useAppRedux() {
  const dispatch = useDispatch()
  const todolists = useSelector<AppRootState, TodolistDomainType[]>(state => state.todolist) //выбираем todolist из стора state
  //<AppRootState, TodolistDomainType[]> означает хотим достать массив todolists из этого типа
  const tasks = useSelector<AppRootState, TasksObjType>(tasks => tasks.tasks)

  const removeTask = useCallback((id: string, todoListId: string) => {
    const action = removeTaskAC(id, todoListId)
    dispatch(action)
  }, [dispatch])

  const addTask = useCallback((title: string, todoListId: string) => {
    const thunk = addTaskTC(title, todoListId) as any
    dispatch(thunk)
  }, [dispatch])

  const changeStatus = useCallback((todoListId: string, id: string, status: TaskStatuses) => {
    const action = changeTaskStatusAC(todoListId, id, status)
    dispatch(action)
  }, [dispatch])

  const changeTaskTitle = useCallback((id: string, input: string, todoListId: string) => {
    const action = changeTaskTitleAC(id, input, todoListId)
    dispatch(action)
  }, [dispatch])


  // todolists action creators
  const changeFilterHandler = useCallback((value: FilterValuesType, todoListId: string) => {
    const action = changeFilterTodolistAC(value, todoListId)
    dispatch(action)
  }, [dispatch])

  const removeTodolist = useCallback((todoListId: string) => {
    const action = removeTodolistAC(todoListId)
    dispatch(action)
  }, [dispatch])

  const addTodoList = useCallback((input: string) => { //добавление новой колонки списка задач
    const thunk = addNewTodolistTC(input) as any
    dispatch(thunk)
  }, [dispatch])


  const changeTodolistTitle = useCallback((title: string, todoListId: string) => {
    const action = changeTitleTodolistAC(title, todoListId)
    dispatch(action)
  }, [dispatch])

  return {
    todolists, tasks,
    removeTask, addTask, changeStatus,
    changeTaskTitle, changeFilterHandler, removeTodolist,
    addTodoList, changeTodolistTitle
  }
}
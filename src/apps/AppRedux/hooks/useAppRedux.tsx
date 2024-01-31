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

  const removeTask = useCallback((id: string, todolistId: string) => {
    const action = removeTaskAC({ taskId: id, todolistId })
    dispatch(action)
  }, [dispatch])

  const addTask = useCallback((title: string, todoListId: string) => {
    const thunk = addTaskTC(title, todoListId) as any
    dispatch(thunk)
  }, [dispatch])

  const changeStatus = useCallback((todolistId: string, id: string, status: TaskStatuses) => {
    const action = changeTaskStatusAC({ todolistId, id, status })
    dispatch(action)
  }, [dispatch])

  const changeTaskTitle = useCallback((id: string, title: string, todolistId: string) => {
    const action = changeTaskTitleAC({ id, title, todolistId })
    dispatch(action)
  }, [dispatch])


  // todolists action creators
  const changeFilterHandler = useCallback((value: FilterValuesType, todolistId: string) => {
    const action = changeFilterTodolistAC({ filter: value, todolistId: todolistId })
    dispatch(action)
  }, [dispatch])

  const removeTodolist = useCallback((todolistId: string) => {
    const action = removeTodolistAC({ todolistId })
    dispatch(action)
  }, [dispatch])

  const addTodoList = useCallback((input: string) => { //добавление новой колонки списка задач
    const thunk = addNewTodolistTC(input) as any
    dispatch(thunk)
  }, [dispatch])


  const changeTodolistTitle = useCallback((title: string, todolistId: string) => {
    const action = changeTitleTodolistAC({ title, todolistId })
    dispatch(action)
  }, [dispatch])

  return {
    todolists, tasks,
    removeTask, addTask, changeStatus,
    changeTaskTitle, changeFilterHandler, removeTodolist,
    addTodoList, changeTodolistTitle
  }
}
import { useDispatch, useSelector } from "react-redux"
import { AppRootState } from "../../../state/store"
import { useCallback } from "react"
import { ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, addTaskTC } from "../../../state/tasks-reducers/tasks-reducer"
import { FilterValuesType, AddTodolistAC, ChangeFilterTodolistAC, ChangeTitleTodolistAC, RemoveTodolistAC, TodolistDomainType, addTodolistTC } from "../../../state/todoList-reducers/todolists-reducer"
import { TaskStatuses, TasksObjType } from "../../../api/tasks-api"

export function useAppRedux() {
  const dispatch = useDispatch()
  const todolists = useSelector<AppRootState, TodolistDomainType[]>(state => state.todolist) //выбираем todolist из стора state
  //<AppRootState, TodolistDomainType[]> означает хотим достать массив todolists из этого типа
  const tasks = useSelector<AppRootState, TasksObjType>(tasks => tasks.tasks)

  //tasks action creators
  const removeTask = useCallback((id: string, todoListId: string) => {
    const action = RemoveTaskAC(id, todoListId)
    dispatch(action)
  }, [dispatch])

  const addTask = useCallback((title: string, todoListId: string) => {
    const thunk = addTaskTC(title, todoListId) as any
    dispatch(thunk)
  }, [dispatch])

  const changeStatus = useCallback((todoListId: string, id: string, status: TaskStatuses) => {
    const action = ChangeTaskStatusAC(todoListId, id, status)
    dispatch(action)
  }, [dispatch])

  const changeEditableSpan = useCallback((id: string, input: string, todoListId: string) => {
    const action = ChangeTaskTitleAC(id, input, todoListId)
    dispatch(action)
  }, [dispatch])


  // todolists action creators
  const changeFilterHandler = useCallback((value: FilterValuesType, todoListId: string) => {
    const action = ChangeFilterTodolistAC(value, todoListId)
    dispatch(action)
  }, [dispatch])

  const removeTodolist = useCallback((todoListId: string) => {
    const action = RemoveTodolistAC(todoListId)
    dispatch(action)
  }, [dispatch])

  const addTodoList = useCallback((input: string) => { //добавление новой колонки списка задач
    const thunk = addTodolistTC(input) as any
    dispatch(thunk)
  }, [dispatch])


  const changeTodolistTitle = useCallback((title: string, todoListId: string) => {
    const action = ChangeTitleTodolistAC(title, todoListId)
    dispatch(action)
  }, [dispatch])

  return {
    todolists, tasks,
    removeTask, addTask, changeStatus,
    changeEditableSpan, changeFilterHandler, removeTodolist,
    addTodoList, changeTodolistTitle
  }
}
import { useDispatch, useSelector } from "react-redux"
import { AppRootState } from "../../../state/store"
import { useCallback } from "react"
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "../../../state/tasks-reducers/tasks-reducer"
import { FilterValues, TasksObjType, TodoListsType } from "../AppReduxHooks"
import { addTodolistAC, changeFilterTodolistAC, changeTitleTodolistAC, removeTodolistAC } from "../../../state/todoList-reducers/todolists-reducer"

export function useAppRedux() {
  const dispatch = useDispatch()
  const todolists = useSelector<AppRootState, TodoListsType[]>(state => state.todolist) //выбираем todolist из стора state
  //<AppRootState, TodoListsType[]> означает хотим достать массив todolists из этого типа 
  const tasks = useSelector<AppRootState, TasksObjType>(tasks => tasks.tasks)

  //tasks action creators
  const removeTask = useCallback((id: string, todoListId: string) => {
    const action = removeTaskAC(id, todoListId)
    dispatch(action)
  }, [dispatch])

  const addTask = useCallback((inputValue: string, todoListId: string) => {
    const action = addTaskAC(inputValue, todoListId)
    dispatch(action)
  }, [dispatch])

  const changeStatus = useCallback((todoListId: string, id: string, isDone: boolean) => {
    const action = changeTaskStatusAC(todoListId, id, isDone)
    dispatch(action)
  }, [dispatch])

  const changeEditableSpan = useCallback((id: string, input: string, todoListId: string) => {
    const action = changeTaskTitleAC(id, input, todoListId)
    dispatch(action)
  }, [dispatch])


  // todolists action creators
  const changeFilterHandler = useCallback((value: FilterValues, todoListId: string) => {
    const action = changeFilterTodolistAC(value, todoListId)
    dispatch(action)
  }, [dispatch])

  const removeTodolist = useCallback((todoListId: string) => {
    const action = removeTodolistAC(todoListId)
    dispatch(action)
  }, [dispatch])

  const addTodoList = useCallback((input: string) => { //добавление новой колонки списка задач
    const action = addTodolistAC(input)
    dispatch(action)
  }, [dispatch])


  const changeTodolistTitle = useCallback((title: string, todoListId: string) => {
    const action = changeTitleTodolistAC(title, todoListId)
    dispatch(action)
  }, [dispatch])

  return {
    todolists, tasks,
    removeTask, addTask, changeStatus,
    changeEditableSpan, changeFilterHandler, removeTodolist,
    addTodoList, changeTodolistTitle
  }
}
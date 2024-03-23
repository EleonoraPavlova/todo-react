import React, { useCallback } from 'react'
import { useAppDispatch } from 'common/hooks'
import { tasksThunks } from 'reducers/tasksSlice/tasksSlice'
import { FilterValues, TodolistDomain, removeTodolistTC, updateTodolistTC } from 'reducers/todolistsSlice'

export function useTodoList(todolist: TodolistDomain) {
  const dispatch = useAppDispatch()

  let { id, filter, title } = todolist // что входит todoLists пропсы,
  // ПИСАТЬ НУЖНО ТО, ЧТО НУЖНО ВЫТЯНУТЬ ИЗ state - разворачивание объекта todoLists
  //const tasks = useAppSelector<Tasks>(state => state.tasks)

  // useEffect(() => { //download all todolists from api when loading the component
  //   if (demo) return
  // }, []) //пустой [] - отрабатывает один раз при загрузке страницы!

  const removeTodolist = useCallback(() => {
    dispatch(removeTodolistTC(id))
  }, [dispatch, id])

  const addTask = useCallback(
    (title: string) => {
      dispatch(tasksThunks.addTaskTC({ title, todoListId: id }))
    },
    [dispatch, id]
  )

  const changeTodolistTitle = useCallback(
    (title: string) => {
      dispatch(updateTodolistTC({ todoListId: id, title, filter }))
    },
    [dispatch]
  )

  const changeTodoListFilter = useCallback(
    (todoListId: string, filter: FilterValues) => {
      dispatch(updateTodolistTC({ todoListId, title, filter }))
    },
    [dispatch, title]
  )

  const changeFilterAll = useCallback(() => {
    changeTodoListFilter(id, 'all')
  }, [changeTodoListFilter, id])
  const changeFilterActive = useCallback(() => {
    changeTodoListFilter(id, 'active')
  }, [changeTodoListFilter, id])
  const changeFilterCompleted = useCallback(() => {
    changeTodoListFilter(id, 'completed')
  }, [changeTodoListFilter, id])

  return {
    changeFilterAll,
    changeFilterActive,
    changeFilterCompleted,
    changeTodolistTitle,
    addTask,
    removeTodolist,
    filter,
    title,
  }
}

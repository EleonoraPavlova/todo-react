import React, { useCallback } from 'react'
import { useActions } from 'common/hooks'
import { tasksThunks } from 'BLL/reducers/tasksSlice'
import { todolistsThunks } from 'BLL/reducers/todolistsSlice'
import { FilterValues, TodolistDomain } from 'common/types'

export function useTodoList(todolist: TodolistDomain) {
  const { removeTodolistTC, updateTodolistTC } = useActions(todolistsThunks)
  const { addTaskTC } = useActions(tasksThunks)

  let { id, filter, title } = todolist // что входит todoLists пропсы,
  // ПИСАТЬ НУЖНО ТО, ЧТО НУЖНО ВЫТЯНУТЬ ИЗ state - разворачивание объекта todoLists
  //const tasks = useAppSelector<Tasks>(state => state.tasks)

  // useEffect(() => { //download all todolists from api when loading the component
  //   if (demo) return
  // }, []) //пустой [] - отрабатывает один раз при загрузке страницы!

  const removeTodolist = useCallback(() => {
    removeTodolistTC(id)
  }, [removeTodolistTC, id])

  const addTask = useCallback(
    (title: string) => {
      addTaskTC({ title, todoListId: id })
    },
    [addTaskTC, id]
  )

  const changeTodolistTitle = useCallback(
    (title: string) => {
      updateTodolistTC({ todoListId: id, title, filter })
    },
    [updateTodolistTC]
  )

  const changeTodoListFilter = useCallback(
    (todoListId: string, filter: FilterValues) => {
      updateTodolistTC({ todoListId, title, filter })
    },
    [updateTodolistTC, title]
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

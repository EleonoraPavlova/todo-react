import { createAction } from '@reduxjs/toolkit'

// export type ClearTasksTodolistsType = {
//   tasks: Tasks
//   todolists: TodolistDomain[]
// }

export const clearTasksTodolists = createAction('actions/clear-tasks-todolists')

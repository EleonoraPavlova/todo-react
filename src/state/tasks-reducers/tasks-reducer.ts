//BLL
import { AddTodoList, RemoveTodoList, SetTodoList } from "../todoList-reducers/todolists-reducer";
import { TaskStatuses, TaskTypeApi, TasksObjType, UpdateTaskModel, tasksApi } from "../../api_DAL/tasks-api";
import { Dispatch } from "redux";
import { AppRootState } from "../storeBLL";

//type ActionsType = ReturnType<typeof getTodosAC> | ReturnType<typeof changeTodoStatusAC>
export type RemoveTask = ReturnType<typeof RemoveTaskAC>
export type AddTask = ReturnType<typeof AddTaskAC>
export type ChangeTitleTask = ReturnType<typeof ChangeTaskTitleAC>
export type ChangeStatusTask = ReturnType<typeof ChangeTaskStatusAC>
export type SetTasks = ReturnType<typeof SetTasksAC>
export type UpdateTask = ReturnType<typeof UpdateTaskAC>


type ActionsType =  //общий тип!
  RemoveTask
  | AddTask
  | ChangeTitleTask
  | ChangeStatusTask
  | AddTodoList
  | RemoveTodoList
  | SetTodoList
  | SetTasks
  | UpdateTask


export const initialStateTasks: TasksObjType = {}
// {
//   [todoListId1]: [ //id этот передала пропсами id={l.id}  в  TodoList
//     { id: v1(), title: "HTML&CSS", isDone: true },
//     { id: v1(), title: "JS", isDone: true },
//     { id: v1(), title: "ReactJS", isDone: false },
//     { id: v1(), title: "Redax", isDone: false }
//   ],
//   [todoListId2]: [
//     { id: v1(), title: "Milk", isDone: true },
//     { id: v1(), title: "Juice", isDone: true },
//     { id: v1(), title: "Meat", isDone: false },
//     { id: v1(), title: "Bread", isDone: false }
//   ]
// }

//функция не имеет право менять state! сначала нужно создать копию
export const tasksReducer = (state: TasksObjType = initialStateTasks, action: ActionsType): TasksObjType => { //должны всегда вернуть массив
  switch (action.type) {
    case "REMOVE-TASK": {
      let filteredTasks = state[action.todoListId].filter(t => t.id !== action.taskId)
      state[action.todoListId] = filteredTasks
      return { ...state }
    }
    case "ADD-TASK": {
      let newTask = action.task
      return { ...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]] }
    }

    case "CHANGE-TASK-TITLE": {
      return {
        ...state,
        [action.togoListId]: state[action.togoListId].map(t => t.id === action.id ? { ...t, title: action.title } : t)
      }
    }

    case "CHANGE-TASK-STATUS": {
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map(t => t.id === action.id ? { ...t, status: action.status } : t)
      }
    }

    case "UPDATE-TASK": {
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map(t => t.id === action.id ? { ...t, ...action.payload } : t)
      }
    }

    case "ADD-TODOLIST": {
      //добавление общего todolista
      return { ...state, [action.todolist.id]: [] }
    }

    case "REMOVE-TODOLIST": {
      const copyState = { ...state }
      delete copyState[action.id]
      return copyState
    }

    case "SET-TODOLIST": {
      const copyState = { ...state }
      action.todolists.map(tl => copyState[tl.id] = [])
      return copyState
    }

    case "SET-TASKS": {
      //: action.tasks  переопределила массив тасок по конкр action.todolistId
      return { ...state, [action.todoListId]: action.tasks }
    }

    default:
      return state;
  }
}


//action creator
export const RemoveTaskAC = (todoListId: string, taskId: string) => {
  return { type: 'REMOVE-TASK', todoListId: todoListId, taskId: taskId } as const
}

export const AddTaskAC = (task: TaskTypeApi) => {
  return {
    type: 'ADD-TASK',
    task: task
  } as const
}

export const ChangeTaskTitleAC = (id: string, title: string, todoListId: string) => { //можно удалить, есть UpdateTaskAC
  //который меняет любое поле
  return {
    type: 'CHANGE-TASK-TITLE',
    id: id,
    title: title,
    togoListId: todoListId
  } as const
}


export const ChangeTaskStatusAC = (todoListId: string, id: string, status: TaskStatuses) => {
  return {
    type: 'CHANGE-TASK-STATUS',
    id: id,
    todoListId: todoListId,
    status: status
  } as const
}

export const SetTasksAC = (tasks: TaskTypeApi[], todoListId: string) => {
  return {
    type: 'SET-TASKS',
    tasks: tasks,
    todoListId: todoListId
  } as const
}


export const UpdateTaskAC = (todoListId: string, id: string, payload: UpdateTaskModelForReducerFn) => {
  return {
    type: 'UPDATE-TASK',
    todoListId: todoListId,
    id: id,
    payload: payload
  } as const
}


//функции санки  ВСЕ ЗАПРОСЫ НА СЕРВЕР ДЕЛАТЬ В САНКАХ ТОЛЬКО!
export const getTasksTC = (todolistId: string) => { //функц прослойка для dispatch api
  return (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistId)
      .then((res) => {
        dispatch(SetTasksAC(res.data.items, todolistId))
      })
  }
}

export const removeTaskTC = (todoListId: string, taskId: string) => {
  return (dispatch: Dispatch) => {
    tasksApi.deleteTasks(todoListId, taskId)
      .then((res) => {
        const action = RemoveTaskAC(todoListId, taskId)
        dispatch(action)
      })
  }
}

export const addTaskTC = (title: string, todoListId: string) => {
  return (dispatch: Dispatch) => {
    tasksApi.createTasks(title, todoListId)
      .then((res) => {
        const task = res.data.data.item
        const action = AddTaskAC(task)
        dispatch(action)
      })
  }
}


export const changeTaskTitleTC = (todoListId: string, id: string, title: string) => {
  return (dispatch: Dispatch) => {
    tasksApi.updateTaskTitle(todoListId, id, title)
      .then((res) => {
        const action = ChangeTaskTitleAC(id, title, todoListId)
        dispatch(action)
      })
  }
}

export const changeTaskStatusTC = (todoListId: string, id: string, status: TaskStatuses) => {
  return (dispatch: Dispatch, getState: () => AppRootState) => {
    const task = getState().tasks[todoListId].find(t => t.id === id)   //вытянула rootReducer с тасками и нашла нужную
    if (task) {
      const payload: UpdateTaskModel = { //модель самой таски, которую мы пишем вручную чтобы знать конкретные поля для изменения
        //сервер присылает отсылает больше полей
        title: task.title,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        status: status
      }
      tasksApi.updateTaskAtAll(todoListId, id, payload)
        .then((res) => {
          const action = ChangeTaskStatusAC(todoListId, id, status)
          dispatch(action)
        })
    }
    //додeлать чтобы функ обновляла любое поле и сделать такое же с todolist
  }
}

export type UpdateTaskModelForReducerFn = { //какие поля можно обновить в tasks
  title?: string
  description?: string
  status?: number
  priority?: number
  startDate?: string
  deadline?: string
}


//вариант как объединить 2 функции
export const updateTaskTC = (todoListId: string, id: string, apiModal: UpdateTaskModelForReducerFn) => {
  return (dispatch: Dispatch, getState: () => AppRootState) => {
    const task = getState().tasks[todoListId].find(t => t.id === id)   //вытянула rootReducer с тасками и нашла нужную
    if (task) {
      const payload: UpdateTaskModel = { //модель самой таски, которую мы пишем вручную чтобы знать конкретные поля для изменения
        //сервер присылает отсылает больше полей
        title: task.title,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        status: task.status,
        ...apiModal
      }
      tasksApi.updateTaskAtAll(todoListId, id, payload)
        .then((res) => {
          const action = UpdateTaskAC(todoListId, id, payload)
          dispatch(action)
        })
    }
    //додeлать чтобы функ обновляла любое поле и сделать такое же с todolist
  }
}
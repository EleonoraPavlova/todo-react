import React from 'react';
import { TaskForMap } from "./TaskForMap";
import { action } from "@storybook/addon-actions";
import { v1 } from "uuid";
import { todoListId1, todoListId2 } from "../../state/todoList-reducers/todolists-reducer";
import { Box } from "@mui/material";

export default {
  title: "AddItemForm",
  component: TaskForMap
}


const removeTask = action("removeTask") // обязательно для тестирования приходящих колбеков
//покажет содержимое строки

const changeStatus = action("changeStatus") // обязательно для тестирования приходящих колбеков
//покажет содержимое строки

const changeEditableSpan = action("changeEditableSpan") // обязательно для тестирования приходящих колбеков
//покажет содержимое строки


const tasks = {
  [todoListId1]: [ //id этот передала пропсами id={l.id}  в  TodoList
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Redax", isDone: false }
  ],
  [todoListId2]: [
    { id: v1(), title: "Milk", isDone: true },
    { id: v1(), title: "Juice", isDone: true },
    { id: v1(), title: "Meat", isDone: false },
    { id: v1(), title: "Bread", isDone: false }
  ]
}

export const TaskForMapBase = () => {
  return <Box sx={{ width: "200px" }}>
    <TaskForMap task={tasks[todoListId2][1]}
      todoListId={"todoListId"}
      removeTask={removeTask}
      changeStatus={changeStatus}
      changeEditableSpan={changeEditableSpan} />
  </Box>
}
import React from 'react';
import { TaskForMap } from "./TaskForMap";
import { action } from "@storybook/addon-actions";
import { Box } from "@mui/material";
import { startStateTasks } from "../../apps/App/tasksStartState";
import { todoListId2 } from "../../apps/App/id-utils";

export default {
  title: "AddItemForm",
  component: TaskForMap
}


const removeTask = action("removeTask") // обязательно для тестирования приходящих колбеков
//покажет содержимое строки

const changeStatus = action("changeStatus") // обязательно для тестирования приходящих колбеков
//покажет содержимое строки

const changeTaskTitle = action("changeEditableSpan") // обязательно для тестирования приходящих колбеков
//покажет содержимое строки


//id этот передала пропсами id={l.id}  в  TodoList
const tasks = startStateTasks

export const TaskForMapBase = () => {
  return <Box sx={{ width: "200px" }}>
    <TaskForMap task={tasks[todoListId2][1]}
      todoListId={"todoListId"}
      removeTask={removeTask}
      changeStatus={changeStatus}
      changeTaskTitle={changeTaskTitle} />
  </Box>
}
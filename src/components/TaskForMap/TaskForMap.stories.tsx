import React from 'react';
import { TaskForMap } from "./TaskForMap";
import { Box } from "@mui/material";
import { todoListId2 } from "../../state/initialState/id-utils";
import { startStateTasks } from "../../state/initialState/tasksStartState";

export default {
  title: "AddItemForm",
  component: TaskForMap
}

const tasks = startStateTasks

export const TaskForMapBase = () => {
  return <Box sx={{ width: "200px" }}>
    <TaskForMap task={tasks[todoListId2][1]} />
  </Box>
}
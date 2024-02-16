import React from 'react';
import { TaskForMap } from "./TaskForMap";
import { Box } from "@mui/material";
import { startStateTasks, todoListId2 } from "../../state/initialState/tasksStartState";
import { Provider } from "react-redux";
import { storyBookStore } from "../../stories/decorators/ReduxStoreProviderDecorator";

export default {
  title: "AddItemForm",
  component: TaskForMap
}

const tasks = startStateTasks

export const TaskForMapBase = () => {
  return (<Provider store={storyBookStore}>
    <Box sx={{ width: "200px" }}>
      <TaskForMap task={tasks[todoListId2][1]} />
    </Box>
  </Provider>)
}
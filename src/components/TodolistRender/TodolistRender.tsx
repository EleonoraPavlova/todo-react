import { Grid, Paper } from "@mui/material";
import { TaskStatuses, TasksObjType } from "../../api_DAL/tasks-api";
import { memo } from "react";
import { useAppSelector } from "../../state/hooks/hooks-selectors";
import { TodolistDomainType } from "../../state/todoList-reducers/todolists-reducer";
import { TodoListRedux } from "../../page/TodoList/TodoListRedux";

type TodolistRenderProps = {
  demo: boolean //загрузка мокового state
}

export const TodolistRender: React.FC<TodolistRenderProps> = memo(({ demo = false }) => {
  const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolist) //выбираем todolist из стора state
  //TodoListsType[]> означает хотим достать массив todolists из этого типа
  const tasks = useAppSelector<TasksObjType>(tasks => tasks.tasks)

  return (
    <>
      {todolists.map((l) => {
        let tasksForTodolist = tasks[l.id];
        if (l.filter === 'completed') {
          tasksForTodolist = tasks[l.id].filter(t => t.status === TaskStatuses.Completed);
        }
        if (l.filter === 'active') {
          tasksForTodolist = tasks[l.id].filter(t => t.status === TaskStatuses.New);
        }

        return (
          <Grid item key={l.id}>
            <Paper sx={{ padding: "20px" }} elevation={3} >
              <TodoListRedux todolist={l} demo={demo}
                tasksForTodolist={tasksForTodolist}
              />
            </Paper>
          </Grid>
        );
      })}
    </>
  );
});
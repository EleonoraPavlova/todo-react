import { Container, Grid, Paper } from "@mui/material";
import { TaskStatuses, TasksObjType } from "../../api_DAL/tasks-api";
import { memo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks/hooks-selectors";
import { TodolistDomainType, addTodolistTC } from "../../state/todoList-reducers/todolists-reducer";
import { TodoListRedux } from "../../page/TodoList/TodoListRedux";
import { AddItemForm } from "../AddItemForm/AddItemForm";

type TodolistRenderProps = {
  demo: boolean //загрузка мокового state
}

export const TodolistRender: React.FC<TodolistRenderProps> = memo(({ demo = false }) => {
  const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolist) //выбираем todolist из стора state
  //TodoListsType[]> означает хотим достать массив todolists из этого типа
  const tasks = useAppSelector<TasksObjType>(tasks => tasks.tasks)
  const dispatch = useAppDispatch()

  const addTodoList = useCallback((input: string) => { //добавление новой колонки списка задач
    dispatch(addTodolistTC(input))
  }, [dispatch])

  return (
    <Grid container spacing={7} className="grid">
      <Container >
        <div className="container" >
          <AddItemForm addTask={addTodoList} />
        </div>
      </Container >
      {
        todolists.map((l) => {
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
        })
      }
    </Grid>
  );
});
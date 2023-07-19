import React, { useState } from 'react';
import "./style/App.css";
import TodoList, { Task } from './components/TodoList';


export type FilterValues = "all" | "complited" | "active"


function App() {
  let [tasks, setTasks] = useState<Array<Task>>([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
    { id: 4, title: "Redax", isDone: false }
  ])

  let [filter, setFilter] = useState<FilterValues>("all")

  function removeTask(id: number) {
    let filteredTasks = tasks.filter(t => t.id !== id)
    setTasks(filteredTasks)
  }

  let tasksForTodo = tasks;
  if (filter === "complited") {
    tasksForTodo = tasks.filter(t => t.isDone === true)
  }

  if (filter === "active") {
    tasksForTodo = tasks.filter(t => t.isDone === false)
  }

  function changeFilter(value: FilterValues) {
    return setFilter(value)
  }

  return (
    <div className="App">
      <TodoList tasks={tasksForTodo} title1={"This is title one"} removeTask={removeTask} changeFilter={changeFilter} />
    </div>
  );
}

export default App;



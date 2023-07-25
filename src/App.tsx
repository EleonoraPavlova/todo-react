import React, { useState } from 'react';
import "./style/App.css";
import TodoList, { Task } from './components/TodoList';
import { v1 } from "uuid";

// import App1 from "./homework/App1";
// import dataState from "./homework/state";



function App() {
  let [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Redax", isDone: false }
  ])

  function removeTask(id: string) {
    setTasks(tasks.filter(t => t.id !== id))
  }


  function addTask(inputValue: string) {
    let newTask = { id: v1(), title: inputValue, isDone: false }
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }


  return (
    <div className="App">
      <TodoList tasks={tasks} title1={"This is title one"} removeTask={removeTask} addTask={addTask} />
      {/* <App1 title={dataState.data1.title} tasks={dataState.data1.tasks} students={dataState.data1.students} /> */}
    </div>
  );
}

export default App;



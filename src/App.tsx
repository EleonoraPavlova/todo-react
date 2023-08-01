import React, { useState } from 'react';
import "./style/App.css";
import TodoList, { Task } from './components/TodoList/TodoList';
import { v1 } from "uuid";




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

  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      return task.isDone = isDone;
    }
    setTasks([...tasks]) //чтобы был перерендер изменения! обязательно!
  }

  return (
    <div className="App">
      <TodoList tasks={tasks} title1={"This is title one"} removeTask={removeTask} addTask={addTask} changeStatus={changeStatus} />
    </div>
  );
}

export default App;



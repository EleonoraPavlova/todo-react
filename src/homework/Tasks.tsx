import React from 'react';
import { Data } from "./state"

export type TasksProps = {
  data1: Data
  data2: Data
}

function Tasks({ data1, data2 }: TasksProps) {

  return (
    <div>
      <ul>
        <h6>{data1.title}</h6>
        {data1.tasks.map(task => {
          return (<li key={task.taskId}> {task.title}{task.isDone}
          </li>)
        })}
      </ul>
      <ul>{data1.students.map(student => <li>{student}</li>)}</ul>

      <ul>
        <h6>{data2.title}</h6>
        {data2.tasks.map(task => {
          return (<li key={task.taskId}> {task.title}{task.isDone}
          </li>)
        })}
      </ul>
      <ul>{data2.students.map(student => <li>{student}</li>)}</ul>

    </div >)
}

export default Tasks;
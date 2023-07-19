import React from 'react';
import '../App';
import { FilterValues } from "../App";

type TodoListProps = {
  title1?: string
  title2?: number
  title3?: boolean
  tasks: Task[]
  removeTask: (id: number) => void
  changeFilter: (value: FilterValues) => void
}

export type Task = {
  id: number
  title: string
  isDone: boolean
}

function TodoList(props: TodoListProps) {

  return (
    <div>
      <h3>{props.title1}{props.title2}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map(item => (<li key={item.id} ><input type="checkbox" defaultChecked={item.isDone} /> <span>{item.title}</span>
          <button onClick={() => { props.removeTask(item.id) }}>x</button></li>)
        )}
      </ul>
      <div>
        <button onClick={() => { props.changeFilter("all") }}>All</button>
        <button onClick={() => { props.changeFilter("active") }}>Active</button>
        <button onClick={() => { props.changeFilter("complited") }}>Completed</button>
      </div>
    </div >

  );
}

export default TodoList;
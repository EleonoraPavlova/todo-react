import React from 'react';
import '../App';

type ListProps = {
  title1?: string
  title2?: number
  title3?: boolean
  tasks: Task[]
}

type Task = {
  id: number
  title: string
  isDone: boolean
}

function List(props: ListProps) {
  return (
    <div>
      <h3>{props.title1}{props.title2}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map(item => {
          return (<li><input type="checkbox" key={item.id} checked={item.isDone} /> <span>{item.title}</span></li>)
        })}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>

  );
}

export default List;
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import '../App';


type TodoListProps = {
  title1?: string
  title2?: number
  title3?: boolean
  tasks: Task[]
  removeTask: (id: string) => void
  addTask: (inputValue: string) => void
}

export type Task = {
  id: string
  title: string
  isDone: boolean
}

type FilterValues = "all" | "completed" | "active"

function TodoList(props: TodoListProps) {
  let [filter, setFilter] = useState<FilterValues>("all")



  const filterList = () => {
    let tasksForTodo = props.tasks;
    switch (filter) {
      case "completed": {
        return tasksForTodo = props.tasks.filter(t => !t.isDone);
      }
      case "active": {
        return tasksForTodo = props.tasks.filter(t => t.isDone);
      }
      default: return props.tasks;
    }
  }


  function changeFilter(value: FilterValues) {
    return setFilter(value)
  }

  let [inputValue, setInputValue] = useState("")
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      props.addTask(e.currentTarget.value)
      setInputValue("");
    }
  }

  return (
    <div>
      <h3>{props.title1}{props.title2}</h3>
      <div>
        <input type="text" placeholder="Type here...." value={inputValue}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler} />
        <button onClick={() => {
          props.addTask(inputValue);
          setInputValue("");
        }}>+</button>
      </div>
      <ul>
        {filterList().map(item => (<li key={item.id} ><input type="checkbox" defaultChecked={item.isDone} /> <span>{item.title}</span>
          <button onClick={() => { props.removeTask(item.id) }}>x</button></li>)
        )}
      </ul>
      <div>
        <button onClick={() => { changeFilter("all") }}>All</button>
        <button onClick={() => { changeFilter("active") }}>Active</button>
        <button onClick={() => { changeFilter("completed") }}>Completed</button>
      </div>
    </div >

  );
}

export default TodoList;
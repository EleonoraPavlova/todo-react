import React, { ChangeEvent, KeyboardEvent, useState } from 'react';


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
    switch (filter) {
      case "completed": {
        return props.tasks.filter(t => t.isDone);
      }
      case "active": {
        return props.tasks.filter(t => !t.isDone);
      }
      default: return props.tasks;
    }
  }


  function changeFilterHandler(value: FilterValues) {
    return setFilter(value)
  }

  let [inputValue, setInputValue] = useState("")
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTaskHandler(e.currentTarget.value);
    }
  }

  const addTaskHandler = (taskName: string) => {
    props.addTask(taskName);
    setInputValue("");
  }


  return (
    <div>
      <h3>{props.title1}{props.title2}</h3>
      <div>
        <input type="text" placeholder="Type here...." value={inputValue}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler} />
        <button onClick={() => addTaskHandler(inputValue)}>+</button>
      </div>
      <ul>
        {filterList().map(item => {
          const onRemoveHandler = () => props.removeTask(item.id)

          return (<li key={item.id} ><input type="checkbox" defaultChecked={item.isDone} /> <span>{item.title}</span>
            <button onClick={onRemoveHandler}>x</button></li>)
        })}
      </ul>
      <div>
        <button onClick={() => { changeFilterHandler("all") }}>All</button>
        <button onClick={() => { changeFilterHandler("active") }}>Active</button>
        <button onClick={() => { changeFilterHandler("completed") }}>Completed</button>
      </div>
    </div >

  );
}

export default TodoList;
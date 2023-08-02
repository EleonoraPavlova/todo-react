import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { ButtonComponent } from "../ButtonComponent/ButtonComponent";
import style from "./TodoList.module.scss"


type TodoListProps = {
  title?: string
  tasks: Task[]
  removeTask: (id: string) => void
  addTask: (inputValue: string) => void
  changeStatus: (taskId: string, isDone: boolean) => void
}

export type Task = {
  id: string
  title: string
  isDone: boolean
}

type FilterValues = "all" | "completed" | "active"

function TodoList(props: TodoListProps) {
  let [filter, setFilter] = useState<FilterValues>("all")
  let [error, setError] = useState<string | null>(null)

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
    setInputValue(e.currentTarget.value); //тот элемент с которым произошло событие
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      addTaskHandler(e.currentTarget.value);
    }
  }

  const addTaskHandler = (taskName: string) => {
    if (/[a-zа-яё]/i.test(taskName)) {
      props.addTask(taskName);
      setInputValue("");
    } else {
      setError('Required')
    }
  }

  const mappedTasks = () => {
    return filterList().map(item => {
      const onRemoveHandler = () => props.removeTask(item.id)
      const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
        props.changeStatus(item.id, e.currentTarget.checked);
      //console.log(e.currentTarget.checked) //вывожу в консоль смену состояния чеков

      return (<li key={item.id} className={item.isDone ? style.done : ""} ><input type="checkbox" checked={item.isDone} onChange={onChangeHandler} />
        <span>{item.title}</span>
        <ButtonComponent name="X" callBack={onRemoveHandler} />
      </li>)
    })
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input type="text" placeholder="Type here...."
          value={inputValue}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
          className={error ? "error" : ""}

        />
        <ButtonComponent name="+" callBack={() => { addTaskHandler(inputValue) }} />
      </div>
      {error && <div className={style.errorMes}>{error}</div>}
      <ul>
        {mappedTasks()}
      </ul>
      <div>
        <ButtonComponent active={filter === "all"} name="All" callBack={() => { changeFilterHandler("all") }} />
        <ButtonComponent active={filter === "active"} name="Active" callBack={() => { changeFilterHandler("active") }} />
        <ButtonComponent active={filter === "completed"} name="Completed" callBack={() => { changeFilterHandler("completed") }} />
      </div>
    </div >
  );
}

export default TodoList;
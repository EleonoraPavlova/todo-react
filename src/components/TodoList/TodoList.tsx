import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { ButtonComponent } from "../ButtonComponent/ButtonComponent";
import style from "./TodoList.module.scss"
import { FilterValues } from "../../App";


type TodoListProps = {
  title?: string
  tasks: Task[]
  removeTask: (id: string, togoListId: string) => void
  addTask: (inputValue: string, togoListId: string) => void
  changeStatus: (taskId: string, isDone: boolean, togoListId: string) => void
  id: string // id из конкретно каждого массива, который лежит в объекте
  filter: FilterValues
  changeFilterHandler: (value: FilterValues, id: string) => void
  removeTodolist: (togoListId: string) => void
}

export type Task = {
  id: string
  title: string
  isDone: boolean
}


function TodoList(props: TodoListProps) {
  let [error, setError] = useState<string | null>(null)
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
      props.addTask(taskName, props.id);
      setInputValue("");
    } else {
      setError('Required')
    }
  }

  const mappedTasks = () => {
    return props.tasks.map(item => {
      const onRemoveHandler = () => props.removeTask(item.id, props.id)
      const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
        props.changeStatus(item.id, e.currentTarget.checked, props.id);
      //console.log(e.currentTarget.checked) //вывожу в консоль смену состояния чеков

      return (<li key={item.id} className={item.isDone ? style.done : ""} ><input type="checkbox" checked={item.isDone} onChange={onChangeHandler} />
        <span>{item.title}</span>
        <ButtonComponent name="X" callBack={onRemoveHandler} />
      </li>)
    })
  }

  const removeTodolistHandler = () => {
    return props.removeTodolist(props.id)
  }

  return (
    <div>
      <ButtonComponent name="remove" callBack={removeTodolistHandler} />
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
        <ButtonComponent active={props.filter === "all"} name="All" callBack={() => { props.changeFilterHandler("all", props.id) }} />
        <ButtonComponent active={props.filter === "active"} name="Active" callBack={() => { props.changeFilterHandler("active", props.id) }} />
        <ButtonComponent active={props.filter === "completed"} name="Completed" callBack={() => { props.changeFilterHandler("completed", props.id) }} />
      </div>
    </div >
  );
}

export default TodoList;
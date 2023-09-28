import React, { ChangeEvent } from 'react';
import { Task } from "./TodoList/TodoList";


type TaskMappedType = {
  task: Task
  removeTask: (taskId: string) => void
  changeStatus: () => void
}

//вся мемоизация работает в паре с React.memo(давать просто каждой компрненте)

export const TaskMapped: React.FC<TaskMappedType> = React.memo(({ }: TaskMappedType) => {
  console.log("TaskMapped has been called")

  return (<></>
    //     const onRemoveHandler = () => removeTask(task.id)
    //     const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    //     props.changeStatus(props.id, item.id, e.currentTarget.checked);
    // //console.log(e.currentTarget.checked) //вывожу в консоль смену состояния чеков

    // const EditableSpanHandler = (input: string) => {
    //   props.changeEditableSpan(item.id, input, props.id);
    // }
    // return (<ListItem sx={{ justifyContent: "space-between" }} key={item.id} className={`${styled.list} ${item.isDone ? styled.done : ""}`} >
    //   <Checkbox checked={item.isDone} onChange={onChangeHandler}
    //     icon={<BookmarkBorderIcon />}
    //     checkedIcon={<BookmarkIcon />}
    //     color="success"
    //   />

    //   <EditableSpan title={item.title} onChange={EditableSpanHandler} />
    //   <IconButton aria-label="delete" onClick={onRemoveHandler} size="small" >
    //     <Delete fontSize="inherit" />
    //   </IconButton>
    // </ListItem>
  )
}
)

import React, { memo } from 'react';
import { Button } from "@mui/material";
import { FilterValues } from "../apps/AppReducer";


type ButtonsMemoType = {
  filter: FilterValues
  id: string
  changeFilterHandler: (filter: FilterValues, togoListId: string) => void
}


export const ButtonsMemo: React.FC<ButtonsMemoType> = memo(({ changeFilterHandler, filter, id }: ButtonsMemoType) => {
  console.log("ButtonsMemo has been called")

  return (
    <div>
      <Button size="small" variant={filter === "all" ? "contained" : "text"}
        children={"All"}
        onClick={() => { changeFilterHandler("all", id) }} className="button" />
      <Button size="small" color={"primary"}
        variant={filter === "active" ? "contained" : "text"} children={"Active"}
        onClick={() => { changeFilterHandler("active", id) }} className="button" />
      <Button size="small" color={"secondary"}
        variant={filter === "completed" ? "contained" : "text"}
        children={"Completed"} onClick={() => { changeFilterHandler("completed", id) }}
        className="button" />

    </div >
  )
})


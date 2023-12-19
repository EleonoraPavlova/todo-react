import React from 'react';
import { action } from "@storybook/addon-actions";
import { EditableSpan } from "./EditableSpan";

export default {
  title: "EditableSpan",
  component: EditableSpan
}


const onChange = action("onChanges")

export const EditableSpanBase = () => {
  return (<EditableSpan value={"Title"} onChange={onChange} additionalClass="" />)
}
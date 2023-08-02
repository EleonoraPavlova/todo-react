import React from 'react';
import styled from "styled-components";

type ButtonProps = {
  active?: boolean;
  name: string;
  callBack: () => void;
  additionalClass?: string;
}

export const ButtonComponent = (props: ButtonProps) => {
  const onClickHandler = () => {
    return props.callBack();
  };

  return (<Button type="button" onClick={onClickHandler} className={props.additionalClass} $active={props.active}>{props.name}</Button>)
}

//// const Button = styled.button<Pick<ButtonProps, 'active'>>`
const Button = styled.button<{ $active?: boolean }>`
background - color: inherit;
cursor: pointer;
margin - left: 10px;
padding: 7px;
border - radius: 3px;
color: ${props => props.$active ? "green" : "gray"};
border: ${props => props.$active ? "1px solid green" : "gray"};
}`

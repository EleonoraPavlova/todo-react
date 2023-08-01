import React from 'react';

type ButtonProps = {
  name: string;
  callBack: () => void;
}

export const Button = (props: ButtonProps) => {
  const onClickHandler = () => {
    return props.callBack();
  };

  return (<button type="button" onClick={onClickHandler}>{props.name}</button>)
}
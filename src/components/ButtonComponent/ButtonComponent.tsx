import React from 'react'
import style from 'styled-components'

type ButtonProps = {
  active?: boolean
  name: string
  callBack: () => void
  additionalClass?: string
}

export const ButtonComponent: React.FC<ButtonProps> = ({ active, name, callBack, additionalClass }: ButtonProps) => {
  const onClickHandler = () => {
    return callBack()
  }

  return (
    <Button type="button" onClick={onClickHandler} className={additionalClass} $active={active}>
      {name}
    </Button>
  )
}

const Button = style.button<{ $active?: boolean }>`
background-color: inherit;
cursor: pointer;
margin-left: 10px;
padding: 7px;
border-radius: 3px;
color: ${(props) => (props.$active ? 'green' : 'gray')};
border: ${(props) => (props.$active ? '1px solid green' : '1px solid gray')};
}`

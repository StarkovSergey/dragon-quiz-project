import { ChangeEvent, KeyboardEvent, useState } from 'react'

import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'

import { InputText } from '../InputText/InputText'

import style from './EditableSpan.module.css'

type PropsType = {
  text: string
  changeText: (text: string) => void
}

export const EditableSpan = (props: PropsType) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [inputText, setInputText] = useState(props.text)

  const turnOnEditMode = () => {
    setEditMode(true)
  }

  const turnOffEditMode = () => {
    setEditMode(false)
    setInputText(props.text)
  }

  const changeText = () => {
    if (inputText.trim() && inputText !== props.text) {
      props.changeText(inputText)
    }
    setEditMode(false)
  }

  const inputChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputText(evt.currentTarget.value)
  }

  const inputKeyDownHandler = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      changeText()
    }

    if (evt.key === 'Escape') {
      turnOffEditMode()
    }
  }

  return editMode ? (
    <div className={style.box}>
      <InputText
        value={inputText}
        onChange={inputChangeHandler}
        onKeyDown={inputKeyDownHandler}
        onBlur={changeText}
        autoFocus
      />
    </div>
  ) : (
    <div className={style.box}>
      <span>{props.text}</span>
      <IconButton className={style['icon-button']} onClick={turnOnEditMode}>
        <EditIcon />
      </IconButton>
    </div>
  )
}

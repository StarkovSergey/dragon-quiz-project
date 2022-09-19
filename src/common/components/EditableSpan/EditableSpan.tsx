import { ChangeEvent, KeyboardEvent, useState } from 'react'

import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'

import { useAppSelector } from '../../../app/store'
import { Button } from '../Button/Button'
import { InputText } from '../InputText/InputText'

type PropsType = {
  text: string
  changeText: (text: string) => void
}

export const EditableSpan = (props: PropsType) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [inputText, setInputText] = useState(props.text)

  const name = useAppSelector(state => state.auth.profile.name)

  const turnOnEditMode = () => {
    setEditMode(true)
  }

  const turnOffEditMode = () => {
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
      turnOffEditMode()
    }
  }

  return editMode ? (
    <div className="box">
      <InputText
        label="Nickname"
        value={inputText}
        onChange={inputChangeHandler}
        onKeyDown={inputKeyDownHandler}
        autoFocus
      />
      <Button onClick={turnOffEditMode}>Save</Button>
    </div>
  ) : (
    <div className="box">
      <b>{name}</b>
      <IconButton onClick={turnOnEditMode}>
        <EditIcon />
      </IconButton>
    </div>
  )
}

import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

import { Button } from '../../Button/Button'
import { InputText } from '../../InputText/InputText'
import { BasicModal } from '../BasicModal/BasicModal'

import style from './SaveNameModal.module.css'

type PropsType = {
  title: string
  open: boolean
  toggleOpenMode: (value: boolean) => void
  saveName: (text: string) => void
  isAddNewItem?: boolean
  itemTitle?: string
}

export const SaveNameModal: React.FC<PropsType> = ({
  title,
  open,
  toggleOpenMode,
  saveName,
  itemTitle = '',
  isAddNewItem = false,
}) => {
  const [text, setText] = useState(itemTitle)

  const inputChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setText(evt.currentTarget.value)
  }

  const inputKeyDownHandler = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      saveButtonHandler()
    }
  }

  const saveButtonHandler = () => {
    saveName(text)
    if (isAddNewItem) setText('')
    toggleOpenMode(false)
  }

  const onCloseModal = () => {
    toggleOpenMode(false)
    setText(itemTitle)
  }

  return (
    <BasicModal title={title} open={open} toggleOpenMode={toggleOpenMode} onCloseModal={onCloseModal}>
      <InputText
        value={text}
        onChange={inputChangeHandler}
        onKeyDown={inputKeyDownHandler}
        label="Name pack"
        className={style.input}
        autoFocus
      />
      <div className={style['button-box']}>
        <Button onClick={saveButtonHandler} art>
          Save
        </Button>
        <Button onClick={onCloseModal}>Cancel</Button>
      </div>
    </BasicModal>
  )
}

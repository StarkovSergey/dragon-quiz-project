import React from 'react'

import { Button } from '../../Button/Button'
import { BasicModal } from '../BasicModal/BasicModal'

import style from './DeleteModal.module.css'

type PropsType = {
  title: string
  message: string
  open: boolean
  toggleOpenMode: (value: boolean) => void
  deleteItem: () => void
}

export const DeleteModal: React.FC<PropsType> = ({ title, open, toggleOpenMode, deleteItem, message }) => {
  const deleteButtonHandler = () => {
    deleteItem()
    toggleOpenMode(false)
  }

  const onCloseModal = () => {
    toggleOpenMode(false)
  }

  return (
    <BasicModal title={title} open={open} toggleOpenMode={toggleOpenMode} onCloseModal={onCloseModal}>
      <p>{message}</p>
      <div className={style['button-box']}>
        <Button onClick={deleteButtonHandler} art autoFocus>
          Delete
        </Button>
        <Button onClick={onCloseModal}>Cancel</Button>
      </div>
    </BasicModal>
  )
}

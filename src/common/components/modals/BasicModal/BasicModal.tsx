import * as React from 'react'
import { ReactNode } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'
import Modal from '@mui/material/Modal'

import style from './BasicModal.module.css'

type PropsType = {
  children: ReactNode
  title: string
  open: boolean
  toggleOpenMode: (value: boolean) => void
  onCloseModal?: () => void
}

export const BasicModal: React.FC<PropsType> = ({ children, title, toggleOpenMode, ...props }) => {
  const handleClose = () => {
    toggleOpenMode(false)

    if (props.onCloseModal) {
      props.onCloseModal()
    }
  }

  const modalClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
  }

  return (
    <div onClick={modalClickHandler}>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={style.container}>
          <div className={style.header}>
            <h2 className={style.title}>{title}</h2>
            <IconButton onClick={handleClose} className={style['close-button']}>
              <CloseIcon color="primary" />
            </IconButton>
          </div>
          {children}
        </div>
      </Modal>
    </div>
  )
}

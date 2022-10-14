import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { uploadFileHandler } from '../../../utils/uploadFileHandler'
import { Button } from '../../Button/Button'
import { ImageUploader } from '../../ImageUploader/ImageUploader'
import { InputText } from '../../InputText/InputText'
import { BasicModal } from '../BasicModal/BasicModal'

import style from './SaveNameModal.module.css'

type PropsType = {
  title: string
  open: boolean
  toggleOpenMode: (value: boolean) => void
  saveName: (param: { name: string; imagePack: string }) => void
  isAddNewItem?: boolean
  itemTitle?: string
  image?: string
}

export const SaveNameModal: React.FC<PropsType> = ({
  title,
  open,
  toggleOpenMode,
  saveName,
  itemTitle = '',
  isAddNewItem = false,
  ...props
}) => {
  const [name, setText] = useState(itemTitle)
  const [imagePack, setImagePack] = useState<any>(props.image || '')

  const dispatch = useAppDispatch()
  const inputChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setText(evt.currentTarget.value)
  }

  const inputKeyDownHandler = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      saveButtonHandler()
    }
  }

  const saveButtonHandler = () => {
    saveName({
      name,
      imagePack,
    })
    if (isAddNewItem) {
      setText('')
    }
    toggleOpenMode(false)
  }

  const onCloseModal = () => {
    toggleOpenMode(false)
    setText(itemTitle)
  }

  const addImagePackTitle = (e: ChangeEvent<HTMLInputElement>) => {
    uploadFileHandler(
      e,
      (file64: string) => {
        setImagePack(file64)
      },
      dispatch
    )
  }

  return (
    <BasicModal title={title} open={open} toggleOpenMode={toggleOpenMode} onCloseModal={onCloseModal}>
      <ImageUploader callback={addImagePackTitle} image={imagePack} />
      <InputText
        value={name}
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

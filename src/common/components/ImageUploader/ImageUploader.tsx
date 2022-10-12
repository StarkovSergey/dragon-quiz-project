import React, { ChangeEvent } from 'react'

import dragonImage from '../../../assets/images/cute-dragon.jpg'

import style from './ImageUploader.module.css'

type PropsType = {
  callback: (e: ChangeEvent<HTMLInputElement>) => void
  image: string
}

export const ImageUploader = ({ callback, image }: PropsType) => {
  const inputFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    callback(e)
  }

  return (
    <label className={style.box}>
      <div className={style['image']}>
        <img src={image || dragonImage} alt="question image" />
        <span>Choose image</span>
      </div>
      <input onChange={inputFileHandler} className={style['input']} type="file" accept=".png, .jpg, .jpeg" />
    </label>
  )
}

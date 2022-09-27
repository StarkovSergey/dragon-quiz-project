import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

import { InputText } from '../InputText/InputText'

import style from './SearchInput.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type PropsType = DefaultInputPropsType

export const SearchInput = (props: PropsType) => {
  return (
    <div className={style.box}>
      <InputText search label="Search" {...props} placeholder="Provide your text" />
    </div>
  )
}

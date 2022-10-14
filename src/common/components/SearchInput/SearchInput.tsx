import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

import { InputText } from '../InputText/InputText'

import style from './SearchInput.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type PropsType = DefaultInputPropsType

export const SearchInput = (props: any) => {
  return (
    <div className={style.box}>
      <InputText search label="Search" placeholder="Provide your text" {...props} />
    </div>
  )
}

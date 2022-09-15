import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'

import style from './Checkbox.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type PropsType = DefaultInputPropsType & {
  onChangeChecked?: (checked: boolean) => void
  checked?: boolean
  label?: string
}

export const Checkbox: React.FC<PropsType> = ({
  checked,
  label,
  type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
  onChange,
  onChangeChecked,
  children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e)
    onChangeChecked && onChangeChecked(e.currentTarget.checked)
  }

  return (
    <label className={style.label}>
      <input
        checked={checked}
        type={'checkbox'}
        onChange={onChangeCallback}
        {...restProps}
        className={style.checkbox}
      />
      <span className={style['label-text']}>{label}</span>
    </label>
  )
}

import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, useState } from 'react'

import style from './InputText.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type PropsType = DefaultInputPropsType & {
  label?: string
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: string | boolean
  search?: boolean
  className?: string
}

export const InputText: React.FC<PropsType> = ({
  label,
  onChange,
  onChangeText,
  onKeyDown,
  onEnter,
  error,
  search,
  className,
  ...restProps
}) => {
  // const [showError, setShowError] = useState<boolean>(!!error)

  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    // setShowError(false)

    onChange && // если есть пропс onChange
      onChange(e) // то передать ему е (поскольку onChange не обязателен)

    onChangeText && onChangeText(e.currentTarget.value)
  }

  const onKeyDownCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown && onKeyDown(e)

    if (onEnter && e.key === 'Enter') {
      onEnter()
    }
  }

  return (
    <div className={`${style.box} ${search ? style.search : ''} ${className ? className : ''}`}>
      <label className={style.label}>{label}</label>
      <input
        type={'text'}
        onChange={onChangeCallback}
        onKeyDown={onKeyDownCallback}
        className={style.input}
        autoComplete="off"
        {...restProps}
      />
      {error && <span className={style.error}>{error}</span>}
    </div>
  )
}

import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, useState } from 'react'

import style from './InputText.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type PropsType = DefaultInputPropsType & {
  label?: string
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: string
}

export const InputText: React.FC<PropsType> = ({
  label,
  onChange,
  onChangeText,
  onKeyDown,
  onEnter,
  error,
  ...restProps
}) => {
  const [showError, setShowError] = useState<boolean>(!!error)

  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    setShowError(false)

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
    <div className={style.box}>
      <label className={style.label}>{label}</label>
      <input
        type={'text'}
        onChange={onChangeCallback}
        onKeyDown={onKeyDownCallback}
        className={style.input}
        {...restProps}
      />
      {error && showError && <span className={style.error}>{error}</span>}
    </div>
  )
}

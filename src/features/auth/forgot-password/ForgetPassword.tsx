import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

import { NavLink, useNavigate } from 'react-router-dom'

import { Button } from '../../../common/components/Button/Button'
import { InputText } from '../../../common/components/InputText/InputText'
import { useAppDispatch } from '../../../common/hooks/hooks'
import { forgotPasswordTC } from '../auth-reducer'
import authStyle from '../auth.module.css'
import style from '../sign-in/SignIn.module.css'

export const ForgotPassword = () => {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const sendInctruction = () => {
    dispatch(forgotPasswordTC(email, navigateInSuccess))
  }

  const inputEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }

  const navigateInSuccess = () => {
    navigate('/check-email')
  }

  const keyDownEmailHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendInctruction()
    }
  }

  return (
    <div className={authStyle.container}>
      <h1 className="section-title">Forgot your password?</h1>
      <div className={authStyle['input-box']}>
        <InputText value={email} onChange={inputEmailHandler} onKeyDown={keyDownEmailHandler} placeholder="Email" />
        <p className={authStyle.text}>Enter your email address and we will send you further instructions</p>
      </div>

      <div className={authStyle['button-box']}>
        <Button className={style['submit-button']} onClick={sendInctruction}>
          Send Instructions
        </Button>
        <p className={authStyle.text}>Did you remember your password?</p>
        <NavLink className="link" to={'/sign-in'}>
          Try logging in
        </NavLink>
      </div>
    </div>
  )
}

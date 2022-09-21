import React from 'react'

import { NavLink } from 'react-router-dom'

import { Button } from '../../../common/components/Button/Button'
import { InputText } from '../../../common/components/InputText/InputText'
import authStyle from '../auth.module.css'
import style from '../sign-in/SignIn.module.css'

export const ForgotPassword = () => {
  return (
    <div className={authStyle.container}>
      <h1 className="section-title">Forgot your password?</h1>
      <div className={authStyle['input-box']}>
        <InputText placeholder="Email" />
        <p className={authStyle.text}>Enter your email address and we will send you further instructions</p>
      </div>

      <div className={authStyle['button-box']}>
        <Button type={'submit'} className={style['submit-button']}>
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

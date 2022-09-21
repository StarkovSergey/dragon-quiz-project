import React from 'react'

import { NavLink } from 'react-router-dom'

import mailImg from '../../../assets/images/mail.svg'
import { Button } from '../../../common/components/Button/Button'
import { InputText } from '../../../common/components/InputText/InputText'
import authStyle from '../auth.module.css'
import style from '../sign-in/SignIn.module.css'

export const CheckEmail = () => {
  return (
    <div className={authStyle.container}>
      <h1 className="section-title">Check Email</h1>
      <div className={authStyle['input-box']}>
        <img src={mailImg} alt="" />
      </div>

      <div className={authStyle['button-box']}>
        <p className={authStyle.text}>We’ve sent an Email with instructions to example@mail.com</p>

        <NavLink className="link" to={'/sign-in'}>
          Back to login
        </NavLink>
      </div>
    </div>
  )
}

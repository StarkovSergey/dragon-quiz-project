import React from 'react'

import { NavLink } from 'react-router-dom'

import mailImg from '../../../assets/images/mail.svg'
import authStyle from '../auth.module.css'

export const CheckEmail = () => {
  return (
    <div className={authStyle.container}>
      <h1 className="section-title">Check Email</h1>
      <div className={authStyle['input-box']}>
        <img src={mailImg} alt="" />
      </div>

      <div className={authStyle['button-box']}>
        <p className={authStyle.text}>We’ve sent an Email with instructions to your email</p>

        <NavLink className="link" to={'/sign-in'}>
          Back to login
        </NavLink>
      </div>
    </div>
  )
}

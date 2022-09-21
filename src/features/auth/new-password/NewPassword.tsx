import React from 'react'

import eyeImg from '../../../assets/icons/eye.webp'
import { Button } from '../../../common/components/Button/Button'
import { showPassword } from '../../../common/components/customShowPassword/showPassword'
import { InputText } from '../../../common/components/InputText/InputText'
import authStyle from '../auth.module.css'
import style from '../sign-in/SignIn.module.css'

export const NewPassword = () => {
  const { show, setShowPassword } = showPassword()

  return (
    <div className={authStyle.container}>
      <h1 className="section-title">Create new password</h1>
      <div className={authStyle['input-box']}>
        <div className={authStyle['password-box']}>
          <InputText placeholder="Password" type={show ? 'password' : 'text'} />
          <div onClick={setShowPassword} className={`${authStyle.eye} ${show ? '' : authStyle.cross}`}>
            <img src={eyeImg} alt="eye" width="30px" />
          </div>
        </div>
        <p>Create new password and we will send you further instructions to email</p>
      </div>

      <div className={authStyle['button-box']}>
        <Button type={'submit'} className={style['submit-button']}>
          Create new password
        </Button>
      </div>
    </div>
  )
}

import React, { ChangeEvent, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import eyeImg from '../../../assets/icons/eye.webp'
import { Button } from '../../../common/components/Button/Button'
import { InputText } from '../../../common/components/InputText/InputText'
import { showPassword } from '../../../common/components/–°ustomShowPassword/showPassword'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { Paths } from '../../../common/routes'
import { setNewPassword } from '../auth-slice'
import authStyle from '../auth.module.css'
import style from '../sign-in/SignIn.module.css'

export const NewPassword = () => {
  const { show, setShowPassword } = showPassword()
  const dispatch = useAppDispatch()
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const { token } = useParams()

  const createNewPassword = () => {
    if (token)
      dispatch(
        setNewPassword({
          password,
          token,
        })
      )
        .unwrap()
        .then(() => {
          navigate(Paths.SingIn)
        })
  }

  const inputPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  return (
    <div className={authStyle.container}>
      <h1 className="section-title">Create new password</h1>
      <div className={authStyle['input-box']}>
        <div className={authStyle['password-box']}>
          <InputText
            value={password}
            onChange={inputPasswordHandler}
            placeholder="Password"
            type={show ? 'password' : 'text'}
          />
          <div onClick={setShowPassword} className={`${authStyle.eye} ${show ? '' : authStyle.cross}`}>
            <img src={eyeImg} alt="eye" width="30px" />
          </div>
        </div>
        <p>Create new password and we will send you further instructions to email</p>
      </div>

      <div className={authStyle['button-box']}>
        <Button onClick={createNewPassword} className={style['submit-button']}>
          Create new password
        </Button>
      </div>
    </div>
  )
}

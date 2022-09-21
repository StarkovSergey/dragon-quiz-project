import React from 'react'

import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import eyeImg from '../../../assets/icons/eye.webp'
import { Button } from '../../../common/components/Button/Button'
import { showPassword } from '../../../common/components/customShowPassword/showPassword'
import { InputText } from '../../../common/components/InputText/InputText'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { setRegisteredInTC } from '../auth-reducer'
import authStyle from '../auth.module.css'

import style from './SignUp.module.css'
import { validateSignUp } from './validateSignUp'

export type SignUpFormType = {
  email?: string
  password?: string
  confirmPassword?: string
}

export const SignUp = () => {
  const { show, setShowPassword, showConfirm, setShowConfirmPassword } = showPassword()
  const dispatch = useAppDispatch()
  const isRegister = useAppSelector(state => state.auth.isRegister)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: values => validateSignUp(values),
    onSubmit: values => {
      dispatch(setRegisteredInTC(values))
    },
  })

  if (isRegister) {
    return <Navigate to={'/sign-in'} />
  }

  return (
    <div className={authStyle.container}>
      <form onSubmit={formik.handleSubmit}>
        <h2 className="section-title">Sign Up</h2>

        <div className={authStyle['input-box']}>
          <InputText
            label={'Email'}
            id={'email'}
            {...formik.getFieldProps('email')}
            error={formik.touched.email && formik.errors.email}
          />

          <div>
            <div className={authStyle['password-box']}>
              <InputText
                label={'Password'}
                type={show ? 'password' : 'text'}
                {...formik.getFieldProps('password')}
                error={formik.touched.password && formik.errors.password}
              />
              <div onClick={setShowPassword} className={`${authStyle.eye} ${show ? '' : authStyle.cross}`}>
                <img src={eyeImg} alt="eye" width="30px" />
              </div>
            </div>
          </div>

          <div>
            <div className={authStyle['password-box']}>
              <InputText
                label={'Confirm password'}
                type={showConfirm ? 'password' : 'text'}
                {...formik.getFieldProps('confirmPassword')}
                error={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
              <div
                onClick={setShowConfirmPassword}
                className={`${authStyle.eye} ${showConfirm ? '' : authStyle.cross}`}
              >
                <img src={eyeImg} alt="eye" width="30px" />
              </div>
            </div>
          </div>
        </div>

        <div className={authStyle['button-box']}>
          <Button type={'submit'}>Sign Up</Button>
          <p className={authStyle.text}>Already have an account?</p>
          <NavLink className="link" to={'/sign-in'}>
            Sign In
          </NavLink>
        </div>
      </form>
    </div>
  )
}

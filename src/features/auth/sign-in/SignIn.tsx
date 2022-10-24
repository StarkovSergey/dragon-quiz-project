import React from 'react'

import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import eyeImg from '../../../assets/icons/eye.webp'
import { Button } from '../../../common/components/Button/Button'
import { Checkbox } from '../../../common/components/Checkbox/Checkbox'
import { InputText } from '../../../common/components/InputText/InputText'
import { showPassword } from '../../../common/components/СustomShowPassword/showPassword'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { login } from '../auth-slice'
import authStyle from '../auth.module.css'
import { selectIsLoggedIn } from '../selectors'

import style from './SignIn.module.css'

export const SignIn = () => {
  const { show, setShowPassword } = showPassword()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    } as LoginFormDataType,
    validate: values => {
      const errors: FormikLoginErrorsType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email.trim())) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 2) {
        errors.password = 'Password should have at least one symbol'
      }

      return errors
    },
    onSubmit: values => {
      dispatch(login(values))
    },
  })

  if (isLoggedIn) {
    return <Navigate to={'/'} />
  }

  return (
    <div className={authStyle.container}>
      <h1 className="section-title">Sign in</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className={authStyle['input-box']}>
          <InputText
            {...formik.getFieldProps('email')}
            name={'email'}
            label="Email"
            error={formik.touched.email && formik.errors.email}
          />

          <div className={authStyle['password-box']}>
            <InputText
              {...formik.getFieldProps('password')}
              name={'password'}
              label="Password"
              type={show ? 'password' : 'text'}
              error={formik.touched.password && formik.errors.password}
            />
            <div onClick={setShowPassword} className={`${authStyle.eye} ${show ? '' : authStyle.cross}`}>
              <img src={eyeImg} alt="eye" width="30px" />
            </div>
          </div>

          <Checkbox {...formik.getFieldProps('rememberMe')} name={'rememberMe'} label="Remember me" />
        </div>

        <div className={authStyle['button-box']}>
          <NavLink className={`link ${style['password-link']}`} to={'/forgot-password'}>
            Forgot password?
          </NavLink>

          <Button type={'submit'} className={style['submit-button']}>
            Sign In
          </Button>
          <NavLink className="link" to={'/sign-up'}>
            Sign Up
          </NavLink>
        </div>
      </form>
    </div>
  )
}

//types
type FormikLoginErrorsType = {
  email?: string
  password?: string
  rememberMe?: boolean
}
export type LoginFormDataType = {
  email: string
  password: string
  rememberMe: boolean
}

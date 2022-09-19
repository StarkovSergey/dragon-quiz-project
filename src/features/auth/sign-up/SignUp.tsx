import React from 'react'

import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import eyeImg from '../../../assets/icons/eye.webp'
import { Button } from '../../../common/components/Button/Button'
import { showPassword } from '../../../common/components/customShowPassword/showPassword'
import { InputText } from '../../../common/components/InputText/InputText'
import { setRegisteredInTC } from '../auth-reducer'

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
    return <Navigate to={'/sing-in'} />
  }

  return (
    <div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <h2>Sign Up</h2>
          <InputText label={'Email'} id={'email'} {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email && <div style={{ color: 'red' }}>{formik.errors.email}</div>}

          <div>
            <div style={{ display: 'flex' }}>
              <InputText label={'Password'} type={show ? 'password' : 'text'} {...formik.getFieldProps('password')} />
              <div onClick={setShowPassword}>
                <img src={eyeImg} alt="eye" style={{ width: '30px' }} />
              </div>
            </div>

            {formik.touched.password && formik.errors.password && (
              <div style={{ color: 'red' }}>{formik.errors.password}</div>
            )}
          </div>
          <div>
            <div style={{ display: 'flex' }}>
              <InputText
                label={'Confirm password'}
                type={showConfirm ? 'password' : 'text'}
                {...formik.getFieldProps('confirmPassword')}
              />
              <div onClick={setShowConfirmPassword}>
                <img src={eyeImg} alt="eye" style={{ width: '30px' }} />
              </div>
            </div>

            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div style={{ color: 'red' }}>{formik.errors.confirmPassword}</div>
            )}
          </div>

          <Button type={'submit'}>Sign Up</Button>
          <p>Already have an account?</p>
          <NavLink to={''}>Sign In</NavLink>
        </form>
      </div>
    </div>
  )
}

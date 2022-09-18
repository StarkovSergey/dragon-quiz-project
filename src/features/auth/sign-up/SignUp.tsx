import React from 'react'

import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { Button } from '../../../common/components/Button/Button'
import { InputText } from '../../../common/components/InputText/InputText'
import { setRegisteredInTC } from '../auth-reducer'

import { validateSignUp } from './validateSignUp'

export type SignUpFormType = {
  email?: string
  password?: string
  confirmPassword?: string
}

export const SignUp = () => {
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

          <InputText label={'Password'} type="password" {...formik.getFieldProps('password')} />
          {formik.touched.password && formik.errors.password && (
            <div style={{ color: 'red' }}>{formik.errors.password}</div>
          )}

          <InputText label={'Confirm password'} {...formik.getFieldProps('confirmPassword')} />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div style={{ color: 'red' }}>{formik.errors.confirmPassword}</div>
          )}

          <Button type={'submit'}>Sign Up</Button>
          <p>Already have an account?</p>
          <NavLink to={''}>Sign In</NavLink>
        </form>
      </div>
    </div>
  )
}

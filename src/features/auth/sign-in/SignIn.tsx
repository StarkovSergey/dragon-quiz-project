import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { AppRootStateType, useAppDispatch } from '../../../app/store'
import { loginAT } from '../auth-reducer'

export const SignIn = () => {
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
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
      dispatch(loginAT(values))
      formik.resetForm()
    },
  })

  if (isLoggedIn) {
    return <Navigate to={'/'} />
  }

  return (
    <div>
      <h1>Sign in</h1>
      <form onSubmit={formik.handleSubmit}>
        {formik.errors.email && formik.touched.email && (
          <div style={{ color: 'red', fontWeight: 'bold' }}>{formik.errors.email}</div>
        )}
        <div>
          <input {...formik.getFieldProps('email')} name={'email'} placeholder={'email'} />
        </div>
        {formik.errors.password && formik.touched.password && (
          <div style={{ color: 'red', fontWeight: 'bold' }}>{formik.errors.password}</div>
        )}
        <div>
          <input {...formik.getFieldProps('password')} type={'password'} name={'password'} placeholder={'password'} />
        </div>
        <div>
          <input {...formik.getFieldProps('rememberMe')} type={'checkbox'} name={'rememberMe'} />
        </div>
        <button type={'submit'} value={'Send'}>
          send
        </button>
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

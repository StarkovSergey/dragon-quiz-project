import { SignUpFormType } from './SignUp'

export const validateSignUp = (values: any) => {
  const errors: SignUpFormType = {}

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 8) {
    errors.password = 'Password has be longer eight symbol'
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Password does not match'
  }

  return errors
}

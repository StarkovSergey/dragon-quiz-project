import { slice } from './auth-slice'

export * from './selectors'
export * from './auth-slice'
export * from './check-email/CheckEmail'
export * from './forgot-password/ForgetPassword'
export * from './new-password/NewPassword'
export * from './sign-in/SignIn'
export * from './sign-up/SignUp'

export const authReducer = slice.reducer

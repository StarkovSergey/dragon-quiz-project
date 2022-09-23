import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import Page404 from '../../common/components/Page404/Page404'
import { Paths } from '../../common/routes'
import { CheckEmail } from '../../features/auth/check-email/CheckEmail'
import { ForgotPassword } from '../../features/auth/forgot-password/ForgetPassword'
import { NewPassword } from '../../features/auth/new-password/NewPassword'
import { SignIn } from '../../features/auth/sign-in/SignIn'
import { SignUp } from '../../features/auth/sign-up/SignUp'
import { Profile } from '../../features/profile/Profile'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Profile />} />
      <Route path={Paths.SingIn} element={<SignIn />} />
      <Route path={Paths.SignUp} element={<SignUp />} />
      <Route path={Paths.ForgotPassword} element={<ForgotPassword />} />
      <Route path={Paths.SetNewPassword} element={<NewPassword />} />
      <Route path={Paths.CheckEmail} element={<CheckEmail />} />
      <Route path={Paths.Profile} element={<Profile />} />
      <Route path="*" element={<Navigate to="404" />} />
      <Route path={Paths.Page404} element={<Page404 />} />
    </Routes>
  )
}

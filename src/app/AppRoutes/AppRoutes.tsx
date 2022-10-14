import React from 'react'

import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import Page404 from '../../common/components/Page404/Page404'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { Paths } from '../../common/routes'
import { CheckEmail, ForgotPassword, NewPassword, SignIn, SignUp } from '../../features/auth'
import { Cards } from '../../features/cards'
import { Learn } from '../../features/learn/Learn'
import { Packs } from '../../features/packs/Packs'
import { Profile } from '../../features/profile/Profile'

export const AppRoutes = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const PrivateRoutes = () => {
    return isLoggedIn ? <Outlet /> : <Navigate to={Paths.SingIn} />
  }

  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path={Paths.Packs} element={<Packs />} />
        <Route path={Paths.SetNewPassword} element={<NewPassword />} />
        <Route path={Paths.Profile} element={<Profile />} />
        <Route path={Paths.Cards} element={<Cards />} />
        <Route path={Paths.Learn} element={<Learn />} />
      </Route>
      <Route path={Paths.SignUp} element={<SignUp />} />
      <Route path={Paths.ForgotPassword} element={<ForgotPassword />} />
      <Route path={Paths.CheckEmail} element={<CheckEmail />} />
      <Route path={Paths.SingIn} element={<SignIn />} />
      <Route path="*" element={<Navigate to="404" />} />
      <Route path={Paths.Page404} element={<Page404 />} />
    </Routes>
  )
}

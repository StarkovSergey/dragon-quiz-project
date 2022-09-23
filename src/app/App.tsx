import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErrorSnackbar'
import Page404 from '../common/components/Page404/Page404'
import { useAppDispatch, useAppSelector } from '../common/hooks/hooks'
import { Paths } from '../common/routes'
import { CheckEmail } from '../features/auth/check-email/CheckEmail'
import { ForgotPassword } from '../features/auth/forgot-password/ForgetPassword'
import { NewPassword } from '../features/auth/new-password/NewPassword'
import { SignIn } from '../features/auth/sign-in/SignIn'
import { SignUp } from '../features/auth/sign-up/SignUp'
import { Profile } from '../features/profile/Profile'

import { initializedAppTC } from './app-reducer'
import { Header } from './Header/Header'

export const App = () => {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(state => state.app.isInitialized)

  useEffect(() => {
    dispatch(initializedAppTC())
  }, [])

  if (!isInitialized) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress size="200px" color={'warning'} />
      </div>
    )
  }

  return (
    <div className="app">
      <Header />
      <main>
        <div className="container">
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
        </div>
      </main>
      <ErrorSnackbar />
      <footer></footer>
    </div>
  )
}

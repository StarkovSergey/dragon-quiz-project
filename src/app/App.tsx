import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErrorSnackbar'
import Page404 from '../common/components/Page404/Page404'
import { CheckEmail } from '../features/auth/check-email/CheckEmail'
import { ForgotPassword } from '../features/auth/forgot-password/ForgetPassword'
import { NewPassword } from '../features/auth/new-password/SignIn'
import { SignIn } from '../features/auth/sign-in/SignIn'
import { SignUp } from '../features/auth/sign-up/SignUp'
import { Profile } from '../features/profile/Profile'

import { initializedAppTC } from './app-reducer'
import { Header } from './Header/Header'
import { useAppDispatch, useAppSelector } from './store'

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
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress color={'secondary'} size={200} />
        <ErrorSnackbar />
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
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="new-password" element={<NewPassword />} />
            <Route path="check-email" element={<CheckEmail />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="404" />} />
            <Route path="404" element={<Page404 />} />
          </Routes>
        </div>
      </main>
      <ErrorSnackbar />
      <footer></footer>
    </div>
  )
}

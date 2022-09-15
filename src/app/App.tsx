import React from 'react'

import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

import Page404 from '../common/components/Page404/Page404'
import { TestPage } from '../common/components/TestPage/TestPage'
import { CheckEmail } from '../features/auth/check-email/CheckEmail'
import { SignIn } from '../features/auth/forgot-password/ForgetPassword'
import { NewPassword } from '../features/auth/new-password/SignIn'
import { ForgotPassword } from '../features/auth/sign-in/SignIn'
import { SignUp } from '../features/auth/sign-up/SignUp'
import { Profile } from '../features/profile/Profile'

import { Header } from './Header/Header'

export const App = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="test" element={<TestPage />} />
          <Route path="sing-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="new-password" element={<NewPassword />} />
          <Route path="check-email" element={<CheckEmail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="404" />} />
          <Route path="404" element={<Page404 />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  )
}

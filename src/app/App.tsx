import React from 'react'
import './App.css'
import { Header } from './Header/Header'
import { Route, Routes } from 'react-router-dom'
import { TestPage } from '../features/test-page/TestPage'
import { SignIn } from '../features/auth/forgot-password/ForgetPassword'
import { SignUp } from '../features/auth/sign-up/SignUp'
import { ForgotPassword } from '../features/auth/sign-in/SignIn'
import { NewPassword } from '../features/auth/new-password/SignIn'
import { CheckEmail } from '../features/auth/check-email/CheckEmail'
import { Profile } from '../features/profile/Profile'

export const App = () => {

  return (
    <div className="app">
      <Header/>
      <main>
        <Routes>
          <Route path="test" element={<TestPage/>}/>
          <Route path="sing-in" element={<SignIn/>}/>
          <Route path="sign-up" element={<SignUp/>}/>
          <Route path="forgot-password" element={<ForgotPassword/>}/>
          <Route path="new-password" element={<NewPassword/>}/>
          <Route path="check-email" element={<CheckEmail/>}/>
          <Route path="profile" element={<Profile/>}/>
        </Routes>
      </main>
      <footer></footer>
    </div>
  )
}

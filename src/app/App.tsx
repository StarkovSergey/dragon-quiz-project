import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress } from '@mui/material'

import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErrorSnackbar'
import { useAppDispatch, useAppSelector } from '../common/hooks/hooks'

import { initializedAppTC } from './app-reducer'
import { AppRoutes } from './AppRoutes/AppRoutes'
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
          <AppRoutes />
        </div>
      </main>
      <ErrorSnackbar />
      <footer></footer>
    </div>
  )
}

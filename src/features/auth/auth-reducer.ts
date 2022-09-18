import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { setAppError } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'

import { authAPI, ProfileType, signUpType } from './auth-api'
import { LoginFormDataType } from './sign-in/SignIn'

const initialState = {
  isLoggedIn: false,
  profile: {} as ProfileType,
  isRegister: false,
}

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ProfileType>) => {
      state.profile = action.payload
      state.isLoggedIn = true
    },
    setRegisteredIn(state, action: PayloadAction<{ isRegister: boolean }>) {
      state.isRegister = action.payload.isRegister
    },
  },
})

export const { login, setRegisteredIn } = slice.actions
export const authReducer = slice.reducer

// thunks

export const loginTC =
  (loginFormData: LoginFormDataType): AppThunk =>
  async dispatch => {
    try {
      const res = await authAPI.login(loginFormData)

      dispatch(login(res.data))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        dispatch(setAppError(e))
      }
    }
  }

export const setRegisteredInTC =
  (data: signUpType): AppThunk =>
  async dispatch => {
    try {
      const res = await authAPI.signUp(data)

      dispatch(setRegisteredIn({ isRegister: true }))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e)
      }
    }
  }
// types

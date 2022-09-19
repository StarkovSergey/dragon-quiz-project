import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { AppThunk } from '../../app/store'
import { handleServerNetworkError } from '../../common/utilites/handleNetworkError'

import { authAPI, ProfileType, signUpType } from './auth-api'
import { LoginFormDataType } from './sign-in/SignIn'

const initialState = {
  isLoggedIn: false,
  isRegister: false,
  profile: {} as ProfileType,
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
        handleServerNetworkError(e, dispatch)
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
        handleServerNetworkError(e, dispatch)
      }
    }
  }

// types

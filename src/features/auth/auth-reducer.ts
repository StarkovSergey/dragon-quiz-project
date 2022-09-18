import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { setAppError } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'

import { loginAPI } from './auth-api'
import { LoginFormDataType } from './sign-in/SignIn'

const initialState = {
  isLoggedIn: false,
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
  },
})

export const { login } = slice.actions
export const authReducer = slice.reducer

// thunks
// export const loginAT = createAsyncThunk('auth/login', async (loginData: LoginFormDataType) => {
//   try {
//     const res = await loginAPI.login(loginData)
//
//     console.log(res)
//
//     return res.data
//   } catch (e) {
//     if (axios.isAxiosError(e)) {
//       // @ts-ignore
//       return e.response.data.error
//     }
//   }
// })
export const loginTC =
  (loginFormData: LoginFormDataType): AppThunk =>
  async dispatch => {
    try {
      const res = await loginAPI.login(loginFormData)

      dispatch(login(res.data))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        // @ts-ignore
        dispatch(setAppError(e.response.data.error))
      }
    }
  }
// types
export type ProfileType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number
  token: string
  tokenDeathTime: number
  avatar: string
}

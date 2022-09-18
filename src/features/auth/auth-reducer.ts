import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

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
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginAT.fulfilled, (state, action) => {
      state.profile = action.payload
      state.isLoggedIn = true
    })
  },
})

//export const { login } = slice.actions
export const authReducer = slice.reducer

// thunks
export const loginAT = createAsyncThunk('auth/login', async (loginData: LoginFormDataType) => {
  try {
    const res = await loginAPI.login(loginData)

    return res.data
  } catch (e) {
    if (axios.isAxiosError(e)) {
      // @ts-ignore
      alert(e.response.data.error)
    }
  }
})
// export const loginTC =
//   (loginFormData: LoginFormDataType): AppThunk =>
//   async dispatch => {
//     try {
//       const res = await loginAPI.login(loginFormData)
//
//       console.log(res)
//       dispatch(login(res.data))
//     } catch (e) {
//       console.log(e)
//       if (axios.isAxiosError(e)) {
//         // @ts-ignore
//         alert(e.response.data.error)
//       }
//     }
//   }
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

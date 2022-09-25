import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from '../../app/app-reducer'
import { AppThunk } from '../../common/hooks/hooks'
import { handleServerNetworkError } from '../../common/utils/handleNetworkError'

import { authAPI, ProfileType, signUpType, UpdateProfileModelType } from './auth-api'
import { LoginFormDataType } from './sign-in/SignIn'

const initialState = {
  isLoggedIn: false,
  profile: null as ProfileType | null,
}

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ profile: ProfileType }>) => {
      state.profile = action.payload.profile
      state.isLoggedIn = true
    },
    logout(state) {
      state.isLoggedIn = false
      state.profile = null
    },
    updateProfile(state, action: PayloadAction<{ profile: ProfileType }>) {
      state.profile = action.payload.profile
    },
  },
})

export const { login, logout, updateProfile } = slice.actions
export const authReducer = slice.reducer

// thunks
export const forgotPasswordTC =
  (email: string, navigate: () => void): AppThunk =>
  async dispatch => {
    dispatch(setAppStatus({ status: 'loading' }))

    try {
      await authAPI.forgotPassword(email)
      navigate()
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }

export const setNewPasswordTC =
  (password: string, token: string, navigateInSuccess: () => void): AppThunk =>
  async dispatch => {
    dispatch(setAppStatus({ status: 'loading' }))

    try {
      await authAPI.setNewPassword(password, token)
      navigateInSuccess()
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }

export const updateProfileTC =
  (model: UpdateProfileModelType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatus({ status: 'loading' }))

    try {
      const response = await authAPI.updateProfile(model)

      dispatch(updateProfile({ profile: response.data.updatedUser }))
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }

export const loginTC =
  (loginFormData: LoginFormDataType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      const res = await authAPI.login(loginFormData)

      dispatch(login({ profile: res.data }))
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }

export const logoutTC = (): AppThunk => async dispatch => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    await authAPI.logout()
    dispatch(logout())
    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (e) {
    handleServerNetworkError(e, dispatch)
  }
}

export const setRegisteredInTC =
  (data: signUpType, navigate: () => void): AppThunk =>
  async dispatch => {
    dispatch(setAppStatus({ status: 'loading' }))

    try {
      const res = await authAPI.signUp(data)

      navigate()
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }

// types
export type AuthReducerStateType = typeof initialState

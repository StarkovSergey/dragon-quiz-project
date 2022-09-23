import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from '../../app/app-reducer'
import { AppThunk } from '../../common/hooks/hooks'
import { handleServerNetworkError } from '../../common/utils/handleNetworkError'

import { authAPI, ProfileType, signUpType, UpdateProfileModelType } from './auth-api'
import { LoginFormDataType } from './sign-in/SignIn'

const initialState = {
  isLoggedIn: false,
  profile: null as ProfileType | null,
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
    logout(state) {
      state.isLoggedIn = false
      state.profile = null
    },
    setRegisteredIn(state, action: PayloadAction<{ isRegister: boolean }>) {
      state.isRegister = action.payload.isRegister
    },
    updateProfile(state, action: PayloadAction<{ profile: ProfileType }>) {
      state.profile = action.payload.profile
    },
  },
})

export const { login, logout, setRegisteredIn, updateProfile } = slice.actions
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

      dispatch(login(res.data))
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
  (data: signUpType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatus({ status: 'loading' }))

    try {
      const res = await authAPI.signUp(data)

      dispatch(setRegisteredIn({ isRegister: true }))
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }

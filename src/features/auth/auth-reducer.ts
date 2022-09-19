import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from '../../app/store'
import { handleServerNetworkError } from '../../common/utilites/handleNetworkError'

import { authAPI, ProfileType, signUpType, UpdateProfileModelType } from './auth-api'
import { LoginFormDataType } from './sign-in/SignIn'

const initialState: AuthStateType = {
  isLoggedIn: false,
  profile: null,
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
export const updateProfileTC =
  (model: UpdateProfileModelType): AppThunk =>
  async dispatch => {
    try {
      const response = await authAPI.updateProfile(model)

      dispatch(updateProfile({ profile: response.data.updatedUser }))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }

export const loginTC =
  (loginFormData: LoginFormDataType): AppThunk =>
  async dispatch => {
    try {
      const res = await authAPI.login(loginFormData)

      dispatch(login(res.data))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }

export const logoutTC = (): AppThunk => async dispatch => {
  try {
    await authAPI.logout()
    dispatch(logout())
  } catch (e) {
    handleServerNetworkError(e, dispatch)
  }
}

export const setRegisteredInTC =
  (data: signUpType): AppThunk =>
  async dispatch => {
    try {
      const res = await authAPI.signUp(data)

      dispatch(setRegisteredIn({ isRegister: true }))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }

// types
type AuthStateType = {
  isLoggedIn: boolean
  isRegister: boolean
  profile: ProfileType | null
}

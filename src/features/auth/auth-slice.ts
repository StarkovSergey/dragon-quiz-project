import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from '../../app/app-slice'
import { AppThunk } from '../../app/store'
import { handleServerNetworkError } from '../../common/utils/handleNetworkError'

import { authAPI, ProfileType, signUpType, UpdateProfileModelType } from './auth-api'
import { LoginFormDataType } from './sign-in/SignIn'

// thunks
export const logoutTC = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  dispatch(setAppStatus({ status: 'loading' }))

  try {
    await authAPI.logout()
    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (err) {
    handleServerNetworkError(err, dispatch)
  }
})

export const loginTC = createAsyncThunk(
  'auth/login',
  async (loginFormData: LoginFormDataType, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      const res = await authAPI.login(loginFormData)

      dispatch(setAppStatus({ status: 'succeeded' }))

      return { profile: res.data }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      rejectWithValue(null)
    }
  }
)

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

// initial state
const initialState = {
  isLoggedIn: false,
  profile: null as ProfileType | null,
}

// slice
export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateProfile(state, action: PayloadAction<{ profile: ProfileType }>) {
      state.profile = action.payload.profile
    },
  },
  extraReducers: builder => {
    builder.addCase(logoutTC.fulfilled, state => {
      state.isLoggedIn = false
      state.profile = null
    })
    builder.addCase(loginTC.fulfilled, (state, action) => {
      state.profile = action.payload!.profile
      state.isLoggedIn = true
    })
  },
})

export const { updateProfile } = slice.actions
export const authSlice = slice.reducer

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

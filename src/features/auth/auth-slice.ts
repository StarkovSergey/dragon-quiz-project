import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { setAppStatus } from '../../app/app-slice'
import { handleServerNetworkError } from '../../common/utils/handleNetworkError'

import { authAPI, ProfileType, signUpType, UpdateProfileModelType } from './auth-api'
import { LoginFormDataType } from './sign-in/SignIn'

// thunks
export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  dispatch(setAppStatus({ status: 'loading' }))

  try {
    await authAPI.logout()
    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (err) {
    handleServerNetworkError(err, dispatch)
  }
})

export const login = createAsyncThunk(
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

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (param: { email: string; navigate: () => void }, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus({ status: 'loading' }))

    try {
      await authAPI.forgotPassword(param.email)
      param.navigate()
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      rejectWithValue(null)
    }
  }
)

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (model: UpdateProfileModelType, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus({ status: 'loading' }))

    try {
      const response = await authAPI.updateProfile(model)

      dispatch(setAppStatus({ status: 'succeeded' }))

      return { profile: response.data.updatedUser }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      rejectWithValue(null)
    }
  }
)

export const setNewPassword = createAsyncThunk(
  'auth/setNewPassword',
  async (param: { password: string; token: string; navigateInSuccess: () => void }, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus({ status: 'loading' }))

    try {
      await authAPI.setNewPassword(param.password, param.token)
      param.navigateInSuccess()
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      rejectWithValue(null)
    }
  }
)

export const setRegisteredIn = createAsyncThunk(
  'auth/setRegisteredInTC',
  async (param: { data: signUpType; navigate: () => void }, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus({ status: 'loading' }))

    try {
      await authAPI.signUp(param.data)

      param.navigate()
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      rejectWithValue(null)
    }
  }
)

// initial state
const initialState = {
  isLoggedIn: false,
  profile: null as ProfileType | null,
}

// slice
export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(logout.fulfilled, state => {
      state.isLoggedIn = false
      state.profile = null
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.profile = action.payload!.profile
      state.isLoggedIn = true
    })
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.profile = action.payload!.profile
    })
  },
})

// types
export type AuthReducerStateType = typeof initialState

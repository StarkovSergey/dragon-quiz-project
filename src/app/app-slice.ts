import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { handleServerNetworkError } from '../common/utils/handleNetworkError'
import { authAPI } from '../features/auth/auth-api'
import { loginTC } from '../features/auth/auth-slice'

export const initializedAppTC = createAsyncThunk('app/initializedApp', async (_, { dispatch }) => {
  try {
    const res = await authAPI.me()

    dispatch(
      loginTC.fulfilled({ profile: res.data }, '', {
        email: res.data.email,
        rememberMe: res.data.rememberMe,
        password: res.data.profile,
      })
    )
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleServerNetworkError(error, dispatch)
    }
  }
})

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle',
    error: null,
    isInitialized: false,
  } as AppStateType,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
  },
  extraReducers: builder => {
    builder.addCase(initializedAppTC.fulfilled, state => {
      state.isInitialized = true
    })
  },
})

export const { setAppError, setAppStatus } = slice.actions
export const appSlice = slice.reducer

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppStateType = {
  status: RequestStatusType
  error: null | string
  isInitialized: boolean
}
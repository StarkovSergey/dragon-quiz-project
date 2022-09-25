import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { AppThunk } from '../common/hooks/hooks'
import { handleServerNetworkError } from '../common/utils/handleNetworkError'
import { authAPI } from '../features/auth/auth-api'
import { login } from '../features/auth/auth-reducer'

const initialState: AppStateType = {
  status: 'idle',
  error: null,
  isInitialized: false,
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
  },
})

export const { setAppError, setAppStatus, setInitialized } = slice.actions
export const appReducer = slice.reducer

// thunks
export const initializedAppTC = (): AppThunk => async dispatch => {
  try {
    const res = await authAPI.me()

    dispatch(login({ profile: res.data }))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleServerNetworkError(error, dispatch)
    }
  } finally {
    dispatch(setInitialized({ isInitialized: true }))
  }
}

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppStateType = {
  status: RequestStatusType
  error: null | string
  isInitialized: boolean
}

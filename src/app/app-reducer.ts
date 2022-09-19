import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { handleServerNetworkError } from '../common/utilites/handleNetworkError'
import { authAPI } from '../features/auth/auth-api'
import { login } from '../features/auth/auth-reducer'

import { AppThunk } from './store'

const initialState: AppStateType = {
  status: 'idle',
  error: null,
  isInitialized: false,
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload
    },
    setAppError: (state, action) => {
      state.error = action.payload
    },
    setAppStatus: (state, action: PayloadAction<RequestStatusType>) => {
      state.status = action.payload
    },
  },
})

export const { setAppError, setAppStatus, setInitialized } = slice.actions
export const appReducer = slice.reducer

// thunks
export const initializedAppTC = (): AppThunk => async dispatch => {
  try {
    const res = await authAPI.me()

    dispatch(login(res.data))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleServerNetworkError(error, dispatch)
    }
  } finally {
    dispatch(setInitialized(true))
  }
}

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppStateType = {
  status: RequestStatusType
  error: null | string
  isInitialized: boolean
}

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { handleServerNetworkError } from '../common/utils/handleNetworkError'
import { authAPI } from '../features/auth/auth-api'
import { login } from '../features/auth/auth-reducer'

export const initializedAppTC = createAsyncThunk('app/initializedApp', async (_, { dispatch }) => {
  try {
    const res = await authAPI.me()

    dispatch(login({ profile: res.data }))
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
export const appReducer = slice.reducer

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppStateType = {
  status: RequestStatusType
  error: null | string
  isInitialized: boolean
}

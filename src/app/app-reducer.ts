import { createSlice } from '@reduxjs/toolkit'

import { AppThunk } from './store'

const initialState: AppStateType = {
  status: 'idle',
  error: null,
  isInitialized: false,
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
})

export const appReducer = slice.reducer

// thunks
export const initializedAppTC = (): AppThunk => async dispatch => {
  try {
    //
  } catch (e) {
    //
  }
}

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppStateType = {
  status: RequestStatusType
  error: null | string
  isInitialized: boolean
}

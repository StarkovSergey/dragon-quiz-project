import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
    setAppError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setAppStatus: (state, action: PayloadAction<RequestStatusType>) => {
      state.status = action.payload
    },
  },
  // extraReducers: builder => {
  //   builder
  //     .addCase(loginAT.fulfilled, (state, action) => {
  //       state.error = null
  //     })
  //     .addCase(loginAT.rejected, (state, action) => {
  //       //@ts-ignore
  //       state.error = action.payload
  //       state.status = 'failed'
  //     })
  // },
})

export const { setAppError, setAppStatus } = slice.actions
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

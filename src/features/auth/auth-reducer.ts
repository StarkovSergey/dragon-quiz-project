import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
}

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
})

export const authReducer = slice.reducer

// thunks

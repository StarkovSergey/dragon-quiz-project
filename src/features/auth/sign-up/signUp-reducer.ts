import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { AppThunk } from '../../../app/store'
import { authAPI, signUpType } from '../auth-api'

const initialState = {
  isRegister: false,
}

const slice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setRegisteredIn(state, action: PayloadAction<{ isRegister: boolean }>) {
      state.isRegister = action.payload.isRegister
    },
  },
})

export const signUpReducer = slice.reducer
export const { setRegisteredIn } = slice.actions

export const setRegisteredInTC =
  (data: signUpType): AppThunk =>
  async dispatch => {
    try {
      const res = await authAPI.signUp(data)

      dispatch(setRegisteredIn({ isRegister: true }))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e)
      }
    }
  }

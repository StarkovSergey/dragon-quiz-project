import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from '../../app/app-reducer'
import { AppThunk } from '../../common/hooks/hooks'
import { handleServerNetworkError } from '../../common/utils/handleNetworkError'

import { packAPI, PackDataType } from './packs-api'

const initialState = {
  cardsPack: [] as PackDataType[],
}

export const slice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    setPacks(state, action: PayloadAction<{ cardPacks: PackDataType[] }>) {
      state.cardsPack = action.payload.cardPacks.map(pack => ({ ...pack }))
    },
  },
})

const { setPacks } = slice.actions

export const packReducer = slice.reducer

// thunk
export const setPacksTC =
  (userId: string): AppThunk =>
  async dispatch => {
    dispatch(setAppStatus({ status: 'loading' }))

    try {
      const res = await packAPI.getPack({ user_id: userId })

      console.log(res.data)
      dispatch(setPacks(res.data))

      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }

// types
type InitialStateType = typeof initialState

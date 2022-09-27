import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from '../../app/app-reducer'
import { AppThunk } from '../../common/hooks/hooks'
import { handleServerNetworkError } from '../../common/utils/handleNetworkError'

import { packAPI, PackDataType } from './packs-api'

const initialState = {
  packs: [] as PackDataType[],
}

export const slice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    setPacks(state, action: PayloadAction<{ cardPacks: PackDataType[] }>) {
      state.packs = action.payload.cardPacks.map(pack => ({ ...pack }))
    },
  },
})

export const { setPacks } = slice.actions

export const packsReducer = slice.reducer

// thunk
export const setPacksTC =
  (userId: string | null): AppThunk =>
  async dispatch => {
    dispatch(setAppStatus({ status: 'loading' }))

    try {
      const res = await packAPI.getPack({ user_id: userId })

      dispatch(setPacks(res.data))

      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }

// types
type InitialStateType = typeof initialState

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from '../../app/app-reducer'
import { AppThunk } from '../../common/hooks/hooks'
import { handleServerNetworkError } from '../../common/utils/handleNetworkError'

import { packAPI } from './packs-api'

const initialState = {
  cardsPack: [] as PackDataType[],
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 0,
  pageCount: 0,
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
export const setPacksTC = (): AppThunk => async dispatch => {
  dispatch(setAppStatus({ status: 'loading' }))

  try {
    const res = await packAPI.getPack()

    console.log(res.data)
    dispatch(setPacks(res.data))

    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (e) {
    handleServerNetworkError(e, dispatch)
  }
}

// types
type InitialStateType = typeof initialState

type PackParamsType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string
}

export type PackDataType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
  user_name: string
}

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from '../../app/app-reducer'
import { AppThunk } from '../../common/hooks/hooks'
import { handleServerNetworkError } from '../../common/utils/handleNetworkError'

import { cardsAPI, CardType, GetCardsParamsType } from './cards-api'

const initialState = {
  cards: [] as CardType[],
}

export const slice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<{ cards: CardType[] }>) {
      state.cards = action.payload.cards
    },
  },
})

export const cardsReducer = slice.reducer

export const { setCards } = slice.actions

// thunks
export const setCardsTC =
  (packID: string, params?: GetCardsParamsType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatus({ status: 'loading' }))

    try {
      const res = await cardsAPI.getCards(packID, params)

      dispatch(setCards({ cards: res.data.cards }))

      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }

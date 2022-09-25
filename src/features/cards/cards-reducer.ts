import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from '../../app/app-reducer'
import { AppThunk } from '../../common/hooks/hooks'
import { handleServerNetworkError } from '../../common/utils/handleNetworkError'

import { CardModelType, cardsAPI, CardType, GetCardsParamsType } from './cards-api'

const initialState = {
  cards: [] as CardType[],
  packID: null as null | string,
  isMyPack: false,
}

export const slice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<{ cards: CardType[] }>) {
      state.cards = action.payload.cards
    },
    setPackID(state, action: PayloadAction<{ packID: string }>) {
      state.packID = action.payload.packID
    },
    setIsMyPack(state, action: PayloadAction<{ isMyPack: boolean }>) {
      state.isMyPack = action.payload.isMyPack
    },
    createCard(state, action) {},
  },
})

export const cardsReducer = slice.reducer

export const { setCards, setPackID, setIsMyPack, createCard } = slice.actions

// thunks
export const createCardTC =
  (cardModel: CardModelType): AppThunk =>
  async dispatch => {
    try {
      const response = await cardsAPI.createCard(cardModel)

      dispatch(setCardsTC(cardModel.cardsPack_id))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }

export const setCardsTC =
  (packID: string, params?: GetCardsParamsType): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setAppStatus({ status: 'loading' }))

    try {
      const res = await cardsAPI.getCards(packID, params)
      const userID = getState().auth.profile?._id

      const isMyPack = res.data.packUserId === userID

      dispatch(setCards({ cards: res.data.cards }))
      dispatch(setPackID({ packID }))
      dispatch(setIsMyPack({ isMyPack }))

      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }

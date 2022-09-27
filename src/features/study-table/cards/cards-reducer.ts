import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from '../../../app/app-reducer'
import { AppThunk } from '../../../common/hooks/hooks'
import { handleServerNetworkError } from '../../../common/utils/handleNetworkError'

import { CardModelType, cardsAPI, CardType, GetCardsParamsType, UpdateCardModelType } from './cards-api'

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
    deleteCard(state, action) {},
  },
})

export const cardsReducer = slice.reducer

export const { setCards, setPackID, setIsMyPack, createCard, deleteCard } = slice.actions

// thunks
export const updateCardTC =
  (packID: string, cardModel: UpdateCardModelType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      await cardsAPI.updateCard(cardModel)

      dispatch(setCardsTC(packID))
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }

export const createCardTC =
  (cardModel: CardModelType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      await cardsAPI.createCard(cardModel)

      dispatch(setCardsTC(cardModel.cardsPack_id))
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }

export const deleteCardTC =
  (packID: string, cardID: string): AppThunk =>
  async dispatch => {
    dispatch(setAppStatus({ status: 'loading' }))

    try {
      await cardsAPI.deleteCard(cardID)

      dispatch(setCardsTC(packID))
      dispatch(setAppStatus({ status: 'succeeded' }))
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

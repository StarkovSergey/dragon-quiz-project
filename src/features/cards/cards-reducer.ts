import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'
import { handleServerNetworkError } from '../../common/utils/handleNetworkError'
import { SortType } from '../packs/packs-api'

import { CardModelType, cardsAPI, CardType, UpdateCardModelType } from './cards-api'

const initialState = {
  cards: [] as CardType[],
  packID: null as null | string,
  isMyPack: false,
  search: '',
  min: 0,
  max: 5,
  sortCards: '0updated' as SortType,
  page: 1,
  pageCount: 8,
  cardsTotalCount: 0,
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
    searchCards(state, action: PayloadAction<{ search: string }>) {
      state.search = action.payload.search
    },
    changeCardsTotalCount(state, action: PayloadAction<{ cardsTotalCount: number }>) {
      state.cardsTotalCount = action.payload.cardsTotalCount
    },
    changeCardPage(state, action: PayloadAction<{ page: number }>) {
      state.page = action.payload.page
    },
    changeSortCards(state, action: PayloadAction<{ sort: SortType }>) {
      state.sortCards = action.payload.sort
    },
  },
})

export const cardsReducer = slice.reducer

export const { setCards, setPackID, setIsMyPack, searchCards, changeCardsTotalCount, changeCardPage, changeSortCards } =
  slice.actions

// thunks
export const setCardsTC =
  (packID: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setAppStatus({ status: 'loading' }))
    const { search, sortCards, max, min, page, pageCount } = getState().cards

    try {
      const res = await cardsAPI.getCards(packID!, {
        search,
        sortCards,
        max,
        min,
        page,
        pageCount,
      })
      const userID = getState().auth.profile?._id

      const isMyPack = res.data.packUserId === userID

      dispatch(setCards({ cards: res.data.cards }))
      dispatch(changeCardsTotalCount({ cardsTotalCount: res.data.cardsTotalCount }))

      if (packID) {
        dispatch(setPackID({ packID }))
      }
      dispatch(setIsMyPack({ isMyPack }))

      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }

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

export const searchCardsTC =
  (packID: string, searchText: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(searchCards({ search: searchText }))
      dispatch(setCardsTC(packID))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }

export const changeCardPageTC =
  (packID: string, page: number): AppThunk =>
  async dispatch => {
    dispatch(changeCardPage({ page }))
    dispatch(setCardsTC(packID))
  }

export const changeSortCardTC =
  (packID: string, sort: SortType): AppThunk =>
  async dispatch => {
    dispatch(changeSortCards({ sort }))
    dispatch(setCardsTC(packID))
  }

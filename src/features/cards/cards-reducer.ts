import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RequestStatusType, setAppStatus } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'
import { handleServerNetworkError } from '../../common/utils/handleNetworkError'
import { SortType } from '../packs/packs-api'

import { CardModelType, cardsAPI, CardType, UpdateCardModelType } from './cards-api'

const initialState = {
  cards: [] as CardDomainType[],
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
      state.cards = action.payload.cards.map(card => ({
        ...card,
        status: 'idle',
      }))
    },
    changeCardStatus(state, action: PayloadAction<{ cardID: string; status: RequestStatusType }>) {
      return {
        ...state,
        cards: state.cards.map(card =>
          card._id === action.payload.cardID
            ? {
                ...card,
                status: action.payload.status,
              }
            : card
        ),
      }
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

export const {
  setCards,
  setPackID,
  setIsMyPack,
  searchCards,
  changeCardsTotalCount,
  changeCardPage,
  changeSortCards,
  changeCardStatus,
} = slice.actions

// thunks
export const setCardsTC = (): AppThunk => async (dispatch, getState) => {
  dispatch(setAppStatus({ status: 'loading' }))
  const { search, sortCards, max, min, page, pageCount, packID } = getState().cards

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
  (cardModel: UpdateCardModelType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatus({ status: 'loading' }))
    dispatch(
      changeCardStatus({
        cardID: cardModel._id,
        status: 'loading',
      })
    )
    try {
      await cardsAPI.updateCard(cardModel)

      await dispatch(setCardsTC())
      dispatch(
        changeCardStatus({
          cardID: cardModel._id,
          status: 'succeeded',
        })
      )
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

      dispatch(setCardsTC())
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }

export const deleteCardTC =
  (cardID: string): AppThunk =>
  async dispatch => {
    dispatch(setAppStatus({ status: 'loading' }))

    dispatch(
      changeCardStatus({
        cardID,
        status: 'loading',
      })
    )

    try {
      await cardsAPI.deleteCard(cardID)

      dispatch(setAppStatus({ status: 'succeeded' }))
      await dispatch(setCardsTC())
      dispatch(
        changeCardStatus({
          cardID,
          status: 'succeeded',
        })
      )
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }

export const changeCardPageTC =
  (page: number): AppThunk =>
  async dispatch => {
    dispatch(changeCardPage({ page }))
    dispatch(setCardsTC())
  }

export const searchCardsTC =
  (searchText: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(searchCards({ search: searchText }))
      dispatch(setCardsTC())
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }

export const changeSortCardTC =
  (sort: SortType): AppThunk =>
  async dispatch => {
    dispatch(changeSortCards({ sort }))
    dispatch(setCardsTC())
  }

export const setGradeTC =
  (grade: number, card_id: string): AppThunk =>
  async dispatch => {
    try {
      await cardsAPI.getGrade(grade, card_id)
      dispatch(setCardsTC())
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }

export type CardDomainType = CardType & {
  status: RequestStatusType
}

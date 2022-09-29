import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from '../../../app/app-reducer'
import { AppThunk } from '../../../app/store'
import { handleServerNetworkError } from '../../../common/utils/handleNetworkError'

import { packAPI, PackDataType, sortType } from './packs-api'

const initialState = {
  packs: [] as PackDataType[],
  isMyPacks: false,
  sort: '0updated' as sortType,
  search: '',
  pageCount: 8,
  page: 1,
  min: 0,
  max: 100,
  cardPacksTotalCount: 0,
}

export const slice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    setPacks(state, action: PayloadAction<{ cardPacks: PackDataType[] }>) {
      state.packs = action.payload.cardPacks.map(pack => ({ ...pack }))
    },
    setIsMyPacks(state, action: PayloadAction<{ isMyPacks: boolean }>) {
      state.isMyPacks = action.payload.isMyPacks
    },
    searchPacks(state, action: PayloadAction<{ search: string }>) {
      state.search = action.payload.search
    },
    setCardsCount(state, action: PayloadAction<{ min: number; max: number }>) {
      state.min = action.payload.min
      state.max = action.payload.max
    },
    updatePack(state, action: PayloadAction<{ _id: string; name: string }>) {
      const index = state.packs.findIndex(pack => pack._id === action.payload._id)

      state.packs[index].name = action.payload.name
    },
    changePage(state, action: PayloadAction<{ page: number }>) {
      state.page = action.payload.page
    },
    setCardPacksTotalCount(state, action: PayloadAction<{ cardPacksTotalCount: number }>) {
      state.cardPacksTotalCount = action.payload.cardPacksTotalCount
    },
  },
})

export const {
  setPacks,
  setIsMyPacks,
  searchPacks,
  updatePack,
  changePage,
  setCardPacksTotalCount,
} = slice.actions
export const { setPacks, setIsMyPacks, searchPacks, setCardsCount, addPack, updatePack } = slice.actions

export const packsReducer = slice.reducer

// thunk
export const setPacksTC =
  (minValue?: number, maxValue?: number): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setAppStatus({ status: 'loading' }))

    const { pageCount, page, sort, search, isMyPacks, min, max } = getState().packs
    const userID = getState().auth.profile?._id

    try {
      const res = await packAPI.getPack({
        pageCount,
        page,
        sort,
        search,
        isMyPacks,
        min: minValue ? minValue : min,
        max: maxValue ? maxValue : max,
        userID,
      })

      dispatch(setCardsCount({ min: res.data.minCardsCount, max: res.data.maxCardsCount }))
      console.log('reducer', res)
      console.log('reducer', res.data.maxCardsCount)

      dispatch(setPacks(res.data))
      dispatch(setCardPacksTotalCount({ cardPacksTotalCount: res.data.cardPacksTotalCount }))
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }

export const setIsMyPacksTC =
  (isMyPacks: boolean): AppThunk =>
  async dispatch => {
    try {
      dispatch(setIsMyPacks({ isMyPacks }))
      dispatch(setPacksTC())
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }

export const searchPacksTC =
  (searchText: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(searchPacks({ search: searchText }))
      dispatch(setPacksTC())
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }

export const addNewPackTC = (): AppThunk => async dispatch => {
  dispatch(setAppStatus({ status: 'loading' }))
  const newPack = {
    name: '222',
    deckCover: 'url or base64',
    private: false,
  }

  try {
    await packAPI.addNewPack(newPack)

    dispatch(setPacksTC())
    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (e) {
    handleServerNetworkError(e, dispatch)
  }
}

export const deletePackTC =
  (_id: string): AppThunk =>
  async dispatch => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      await packAPI.deletePack(_id)

      dispatch(setPacksTC())
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }

export const editPackTC =
  (id: string): AppThunk =>
  async dispatch => {
    dispatch(setAppStatus({ status: 'loading' }))
    const newName = 'new name'

    try {
      await packAPI.updatePack(id, newName)

      dispatch(
        updatePack({
          _id: id,
          name: newName,
        })
      )
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e) {
      handleServerNetworkError(e, dispatch)
    }
  }

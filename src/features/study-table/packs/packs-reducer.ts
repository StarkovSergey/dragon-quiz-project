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
  pageCount: 10,
  page: 1,
  min: 0,
  max: 100,
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
    setValueSlider(state, action: PayloadAction<{ min: number; max: number }>) {
      state.min = action.payload.min
      state.max = action.payload.max
    },
    addPack(state, action: PayloadAction<{ cardPacks: PackDataType }>) {
      state.packs.push({ ...action.payload.cardPacks })
    },
  },
})

export const { setPacks, setIsMyPacks, searchPacks, setValueSlider, addPack } = slice.actions

export const packsReducer = slice.reducer

// thunk
export const setPacksTC = (): AppThunk => async (dispatch, getState) => {
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
      min,
      max,
      userID,
    })

    dispatch(setPacks(res.data))

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

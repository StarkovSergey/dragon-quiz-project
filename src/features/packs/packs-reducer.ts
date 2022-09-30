import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'
import { handleServerNetworkError } from '../../common/utils/handleNetworkError'

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
import { packAPI, PackDataType, SortType } from './packs-api'

const initialState = {
  packs: [] as PackDataType[],
  isMyPacks: false,
  sort: '0updated' as SortType,
  search: '',
  pageCount: 8,
  page: 1,
  min: 0,
  max: 99,
  minCardsCount: 0,
  maxCardsCount: 99,
  entity: 'idle' as StatusType,
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
    updatePack(state, action: PayloadAction<{ _id: string; name: string }>) {
      const index = state.packs.findIndex(pack => pack._id === action.payload._id)

      state.packs[index].name = action.payload.name
    },
    entityStatus(state, action: PayloadAction<{ entity: StatusType }>) {
      state.entity = action.payload.entity
    },
    changePage(state, action: PayloadAction<{ page: number }>) {
      state.page = action.payload.page
    },
    setCardPacksTotalCount(state, action: PayloadAction<{ cardPacksTotalCount: number }>) {
      state.cardPacksTotalCount = action.payload.cardPacksTotalCount
    },
    changeSortPack(state, action: PayloadAction<{ sort: SortType }>) {
      state.sort = action.payload.sort
    },
    setCardsRange(state, action: PayloadAction<{ min: number; max: number }>) {
      state.min = action.payload.min
      state.max = action.payload.max
    },
    setMinMaxCardsCount(state, action: PayloadAction<{ min: number; max: number }>) {
      state.minCardsCount = action.payload.min
      state.maxCardsCount = action.payload.max
    },
  },
})

export const {
  setPacks,
  setIsMyPacks,
  searchPacks,
  setCardsRange,
  updatePack,
  setCardPacksTotalCount,
  changePage,
  changeSortPack,
  setMinMaxCardsCount,
  entityStatus,
} = slice.actions

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

      dispatch(
        setMinMaxCardsCount({
          min: res.data.minCardsCount,
          max: res.data.maxCardsCount,
        })
      )

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
    name: 'dragon pack',
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
    dispatch(entityStatus({ entity: 'loading' }))
    try {
      await packAPI.deletePack(_id)

      dispatch(setPacksTC())
      dispatch(setAppStatus({ status: 'succeeded' }))
      dispatch(entityStatus({ entity: 'succeeded' }))
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

export const changePageTC =
  (page: number): AppThunk =>
  async dispatch => {
    dispatch(changePage({ page }))
    dispatch(setPacksTC())
  }

export const changeSortPackTC =
  (sort: SortType): AppThunk =>
  async dispatch => {
    dispatch(changeSortPack({ sort }))
    dispatch(setPacksTC())
  }

export const setCardsRangeTC =
  (range: { min: number; max: number }): AppThunk =>
  async dispatch => {
    dispatch(setCardsRange(range))
    dispatch(setPacksTC())
  }

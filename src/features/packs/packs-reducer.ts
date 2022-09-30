import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RequestStatusType, setAppStatus } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'
import { handleServerNetworkError } from '../../common/utils/handleNetworkError'

import { packAPI, PackType, SortType } from './packs-api'

const initialState = {
  packs: [] as PackDomainType[],
  isMyPacks: false,
  sort: '0updated' as SortType,
  search: '',
  pageCount: 8,
  page: 1,
  min: 0,
  max: 99,
  minCardsCount: 0,
  maxCardsCount: 99,
  cardPacksTotalCount: 0,
  addingNewPackStatus: 'idle' as RequestStatusType,
}

export const slice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    setPacks(state, action: PayloadAction<{ cardPacks: PackType[] }>) {
      state.packs = action.payload.cardPacks.map(pack => ({
        ...pack,
        status: 'idle',
      }))
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
    changePackStatus(state, action: PayloadAction<{ packID: string; status: RequestStatusType }>) {
      return {
        ...state,
        packs: state.packs.map(pack =>
          pack._id === action.payload.packID
            ? {
                ...pack,
                status: action.payload.status,
              }
            : pack
        ),
      }
    },
    changeAddingNewPackStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.addingNewPackStatus = action.payload.status
    },
    resetFilters(state) {
      state.search = ''
      state.isMyPacks = false
      state.min = state.minCardsCount
      state.max = state.maxCardsCount
    },
  },
})

export const {
  setPacks,
  setIsMyPacks,
  searchPacks,
  setCardsRange,
  setCardPacksTotalCount,
  changePage,
  changeSortPack,
  setMinMaxCardsCount,
  changePackStatus,
  changeAddingNewPackStatus,
  resetFilters,
} = slice.actions

export const packsReducer = slice.reducer

// thunk
export const setPacksTC =
  (params?: { isMyPack?: boolean }): AppThunk =>
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
        min,
        max,
        userID,
      })

      dispatch(
        setMinMaxCardsCount({
          min: res.data.minCardsCount,
          max: res.data.maxCardsCount,
        })
      )

      if (params?.isMyPack) {
        dispatch(setIsMyPacks({ isMyPacks: params.isMyPack }))
      }

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
  dispatch(changeAddingNewPackStatus({ status: 'loading' }))
  const newPack = {
    name: 'dragon pack',
    deckCover: 'url or base64',
    private: false,
  }

  try {
    await packAPI.addNewPack(newPack)

    await dispatch(setPacksTC())
    dispatch(setAppStatus({ status: 'succeeded' }))
    dispatch(changeAddingNewPackStatus({ status: 'succeeded' }))
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    dispatch(changeAddingNewPackStatus({ status: 'failed' }))
  }
}

export const deletePackTC =
  (packID: string): AppThunk =>
  async dispatch => {
    dispatch(setAppStatus({ status: 'loading' }))
    dispatch(
      changePackStatus({
        packID,
        status: 'loading',
      })
    )
    try {
      await packAPI.deletePack(packID)

      await dispatch(setPacksTC())
      dispatch(
        changePackStatus({
          packID,
          status: 'succeeded',
        })
      )
    } catch (e) {
      handleServerNetworkError(e, dispatch, { packID })
    }
  }

export const editPackTC =
  (packID: string): AppThunk =>
  async dispatch => {
    dispatch(setAppStatus({ status: 'loading' }))
    dispatch(
      changePackStatus({
        packID,
        status: 'loading',
      })
    )
    const newName = 'new name'

    try {
      await packAPI.updatePack(packID, newName)

      await dispatch(setPacksTC())
      dispatch(
        changePackStatus({
          packID,
          status: 'succeeded',
        })
      )
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e) {
      handleServerNetworkError(e, dispatch, { packID })
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

export const ResetFiltersTC = (): AppThunk => async dispatch => {
  dispatch(resetFilters())
  dispatch(setPacksTC())
}

export type PackDomainType = PackType & {
  status: RequestStatusType
}

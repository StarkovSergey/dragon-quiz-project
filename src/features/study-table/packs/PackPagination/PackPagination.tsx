import React from 'react'

import { Pagination } from '@mui/material'

import { useAppDispatch } from '../../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../../common/hooks/useAppSelector'
import tableStyle from '../../study-table.module.css'
import { changePageTC } from '../packs-reducer'

export const PackPagination = () => {
  const page = useAppSelector(state => state.packs.page)
  const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const dispatch = useAppDispatch()

  const packsPerPage = useAppSelector(state => state.packs.pageCount)
  const paginationPageCount = Math.ceil(cardPacksTotalCount / packsPerPage)

  const paginationChangeHandler = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(changePageTC(value))
  }

  return (
    <Pagination
      className={tableStyle.pagination}
      count={paginationPageCount}
      page={page}
      onChange={paginationChangeHandler}
      shape="rounded"
      color="primary"
    />
  )
}

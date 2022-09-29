import React from 'react'

import { Pagination } from '@mui/material'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import tableStyle from '../../../styles/study-table.module.css'
import { changeCardPageTC } from '../cards-reducer'

type PropsType = {
  packID: string
}

export const CardPagination = ({ packID }: PropsType) => {
  const page = useAppSelector(state => state.cards.page)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const dispatch = useAppDispatch()

  const cardsPerPage = useAppSelector(state => state.cards.pageCount)
  const paginationPageCount = Math.ceil(cardsTotalCount / cardsPerPage)

  const paginationChangeHandler = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(changeCardPageTC(packID, value))
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

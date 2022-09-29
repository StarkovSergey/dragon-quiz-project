import React from 'react'

import { TableCell, TableHead, TableRow } from '@mui/material'

import { useAppDispatch } from '../../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../../common/hooks/useAppSelector'
import tableStyles from '../../../../styles/study-table.module.css'
import { SortType } from '../../packs-api'
import { changeSortPackTC } from '../../packs-reducer'

export const TableHeadComponent = () => {
  const dispatch = useAppDispatch()
  const sorting = useAppSelector(state => state.packs.sort)

  let tableCellSortName = ''

  switch (sorting) {
    case '0created':
      tableCellSortName = 'Last Created ⬇'
      break
    case '1created':
      tableCellSortName = 'Last Created ⬆'
      break
    case '0updated':
      tableCellSortName = 'Last Updated ⬇'
      break
    case '1updated':
      tableCellSortName = 'Last Updated ⬆'
  }

  const toggleSorting = (sorting: SortType) => {
    let newSortValue: SortType

    switch (sorting) {
      case '0created':
        newSortValue = '1created'
        break
      case '1created':
        newSortValue = '0created'
        break
      case '0updated':
        newSortValue = '1updated'
        break
      case '1updated':
        newSortValue = '0updated'
    }

    dispatch(changeSortPackTC(newSortValue))
  }

  return (
    <TableHead className={tableStyles['table-header']}>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell align="center" className={tableStyles['cards-cell']}>
          Cards
        </TableCell>
        <TableCell align="center" onClick={() => toggleSorting(sorting)} className={tableStyles['sorting-header-cell']}>
          {tableCellSortName}
        </TableCell>
        <TableCell align="right" className={tableStyles['created-cell']}>
          Created by
        </TableCell>
        <TableCell align="right" className={tableStyles['actions-cell']}>
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

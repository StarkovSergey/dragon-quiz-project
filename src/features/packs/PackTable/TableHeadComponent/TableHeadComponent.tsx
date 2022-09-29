import React from 'react'

import { TableCell, TableHead, TableRow } from '@mui/material'

import { useAppDispatch } from '../../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../../common/hooks/useAppSelector'
import { getTableSortCellName } from '../../../../common/utils/getTableSortCellName'
import { toggleSorting } from '../../../../common/utils/toggleSorting'
import tableStyles from '../../../../styles/study-table.module.css'
import { SortType } from '../../packs-api'
import { changeSortPackTC } from '../../packs-reducer'

export const TableHeadComponent = () => {
  const dispatch = useAppDispatch()
  const sorting = useAppSelector(state => state.packs.sort)

  let tableCellSortName = getTableSortCellName(sorting)

  const sortTableCellHandler = (sorting: SortType) => {
    dispatch(changeSortPackTC(toggleSorting(sorting)))
  }

  return (
    <TableHead className={tableStyles['table-header']}>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell align="center" className={tableStyles['cards-cell']}>
          Cards
        </TableCell>
        <TableCell
          align="center"
          onClick={() => sortTableCellHandler(sorting)}
          className={tableStyles['sorting-header-cell']}
        >
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

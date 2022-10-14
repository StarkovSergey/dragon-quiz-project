import React from 'react'

import { TableCell, TableHead, TableRow } from '@mui/material'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { getTableSortCellName } from '../../../common/utils/getTableSortCellName'
import { toggleSorting } from '../../../common/utils/toggleSorting'
import tableStyles from '../../../styles/study-table.module.css'
import { SortType } from '../../packs/packs-api'
import { changeSortCardTC } from '../cards-slice'
import { selectIsMyPack, selectSortingCards } from '../selectors'

export const CardTableHead = () => {
  const dispatch = useAppDispatch()
  const isMyPack = useAppSelector(selectIsMyPack)
  const sorting = useAppSelector(selectSortingCards)

  const tableSortCellName = getTableSortCellName(sorting)

  const sortTableCellHandler = (sorting: SortType) => {
    dispatch(changeSortCardTC(toggleSorting(sorting)))
  }

  return (
    <TableHead className={tableStyles['table-header']}>
      <TableRow>
        <TableCell>Question</TableCell>
        <TableCell>Answer</TableCell>
        <TableCell
          align="center"
          onClick={() => sortTableCellHandler(sorting)}
          className={tableStyles['sorting-header-cell']}
        >
          {tableSortCellName}
        </TableCell>
        <TableCell align="center" className={tableStyles['grade-cell']}>
          Grade
        </TableCell>
        {isMyPack && (
          <TableCell align="right" className={tableStyles['actions-cell']}>
            Actions
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  )
}

import React from 'react'

import { TableCell, TableHead, TableRow } from '@mui/material'

import { useAppSelector } from '../../../../../common/hooks/useAppSelector'
import tableStyles from '../../../study-table.module.css'

export const TableHeadComponent = () => {
  const sorting = useAppSelector(state => state.packs.sort)

  return (
    <TableHead className={tableStyles['table-header']}>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell align="right">Cards</TableCell>
        <TableCell align="right">Last Updated</TableCell>
        <TableCell align="right">Created by</TableCell>
        <TableCell align="right">Actions</TableCell>
      </TableRow>
    </TableHead>
  )
}

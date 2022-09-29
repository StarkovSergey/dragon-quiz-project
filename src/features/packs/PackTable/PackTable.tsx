import React from 'react'

import { Paper, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import tableStyles from '../../../styles/study-table.module.css'
import { PackPagination } from '../PackPagination/PackPagination'

import { TableBodyComponent } from './TableBodyComponent/TableBodyComponent'
import { TableHeadComponent } from './TableHeadComponent/TableHeadComponent'

export const PackTable = () => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={tableStyles.table} aria-label="simple table">
          <TableHeadComponent />
          <TableBodyComponent />
        </Table>
      </TableContainer>
      <PackPagination />
    </div>
  )
}

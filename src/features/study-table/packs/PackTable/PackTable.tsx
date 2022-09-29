import React from 'react'

import { Paper, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import tableStyles from '../../study-table.module.css'

import { TableBodyComponent } from './TableBodyComponent/TableBodyComponent'

export const PackTable = () => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={tableStyles.table} aria-label="simple table">
          <TableHead className={tableStyles['table-header']}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Cards</TableCell>
              <TableCell align="right">Last Updated</TableCell>
              <TableCell align="right">Created by</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBodyComponent />
        </Table>
      </TableContainer>
    </div>
  )
}

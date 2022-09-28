import React from 'react'

import { Paper, Table, TableContainer } from '@mui/material'

import { TableBodyComponent } from './TableBodyComponent/TableBodyComponent'
import { TableHeadComponent } from './TableHeadComponent/TableHead'

export const PackTable = () => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHeadComponent />
          <TableBodyComponent />
        </Table>
      </TableContainer>
    </div>
  )
}

import React from 'react'

import { Paper, Table, TableBody, TableContainer } from '@mui/material'

import { useAppSelector } from '../../../common/hooks/useAppSelector'
import tableStyles from '../../../styles/study-table.module.css'
import { PackPagination } from '../PackPagination/PackPagination'

import { PackTableRow } from './PackTableRow/PackTableRow'
import { TableHeadComponent } from './TableHeadComponent/TableHeadComponent'

export const PackTable = () => {
  const packs = useAppSelector(state => state.packs.packs)

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={tableStyles.table} aria-label="simple table">
          <TableHeadComponent />
          <TableBody>
            {packs.map(pack => {
              return <PackTableRow pack={pack} key={pack._id} />
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <PackPagination />
    </div>
  )
}

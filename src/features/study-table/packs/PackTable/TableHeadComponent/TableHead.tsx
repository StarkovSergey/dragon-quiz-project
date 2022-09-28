import { TableCell, TableHead, TableRow } from '@mui/material'

export const TableHeadComponent = () => {
  return (
    <TableHead>
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

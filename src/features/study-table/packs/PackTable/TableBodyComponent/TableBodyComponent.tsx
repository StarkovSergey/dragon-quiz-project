import React from 'react'

import { TableBody, TableCell, TableRow } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../../../common/hooks/useAppSelector'

export const TableBodyComponent = () => {
  const packs = useAppSelector(state => state.packs.packs)
  const navigate = useNavigate()

  return (
    <TableBody>
      {packs.map(pack => {
        const getPackId = () => {
          navigate(`/cards/${pack._id}`)
        }

        return (
          <TableRow onClick={getPackId} key={pack._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              {pack.name}
            </TableCell>
            <TableCell align="right">{pack.cardsCount}</TableCell>
            <TableCell align="right">{pack.updated.slice(0, 10)}</TableCell>
            <TableCell align="right">{pack.user_name}</TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}

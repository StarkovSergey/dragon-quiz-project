import React from 'react'

import { TableBody, TableCell, TableRow } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import deleteSvg from '../../../../../assets/icons/Delete.svg'
import editSvg from '../../../../../assets/icons/Edit.svg'
import teacherSvg from '../../../../../assets/icons/teacher.svg'
import { useAppSelector } from '../../../../../common/hooks/useAppSelector'

export const TableBodyComponent = () => {
  const packs = useAppSelector(state => state.packs.packs)
  const isMyPack = useAppSelector(state => state.packs.isMyPacks)
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

            <TableCell align="right">
              {isMyPack ? (
                <div>
                  <img src={teacherSvg} alt="teacher" />
                  <img src={editSvg} alt="edit" />
                  <img src={deleteSvg} alt="delete" onClick={() => {}} />
                </div>
              ) : (
                <img src={teacherSvg} alt="teacher" />
              )}
            </TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}

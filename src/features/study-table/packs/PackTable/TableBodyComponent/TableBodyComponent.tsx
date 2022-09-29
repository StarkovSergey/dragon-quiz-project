import React from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import SchoolIcon from '@mui/icons-material/School'
import { IconButton, TableBody, TableCell, TableRow } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../../../common/hooks/useAppSelector'
import { deletePackTC, editPackTC } from '../../packs-reducer'

export const TableBodyComponent = () => {
  const packs = useAppSelector(state => state.packs.packs)
  const userID = useAppSelector(state => state.auth.profile?._id)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <TableBody>
      {packs.map(pack => {
        const getPackId = () => {
          navigate(`/cards/${pack._id}`)
        }

        const removePack = () => {
          dispatch(deletePackTC(pack._id))
        }

        const editPack = () => {
          dispatch(editPackTC(pack._id))
        }

        return (
          <TableRow key={pack._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell onClick={getPackId} component="th" scope="row">
              {pack.name}
            </TableCell>
            <TableCell align="right">{pack.cardsCount}</TableCell>
            <TableCell align="right">{pack.updated.slice(0, 10)}</TableCell>
            <TableCell align="right">{pack.user_name}</TableCell>

            <TableCell align="right">
              {userID === pack.user_id ? (
                <div>
                  <IconButton>
                    <SchoolIcon />
                  </IconButton>
                  <IconButton onClick={editPack}>
                    <ModeEditIcon />
                  </IconButton>
                  <IconButton onClick={removePack}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              ) : (
                <IconButton>
                  <SchoolIcon />
                </IconButton>
              )}
            </TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}

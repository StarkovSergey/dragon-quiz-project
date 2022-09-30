import React from 'react'

import ModeEditIcon from '@mui/icons-material/ModeEdit'
import SchoolIcon from '@mui/icons-material/School'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import { IconButton, TableBody, TableCell, TableRow } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../../common/hooks/useAppSelector'
import tableStyle from '../../../../styles/study-table.module.css'
import { deletePackTC, editPackTC } from '../../packs-reducer'
import style from '../../packs.module.css'

export const TableBodyComponent = () => {
  const packs = useAppSelector(state => state.packs.packs)
  const userID = useAppSelector(state => state.auth.profile?._id)
  const entityStatus = useAppSelector(state => state.packs.entity)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <TableBody>
      {packs.map(pack => {
        const getPackId = () => {
          navigate(`/cards/${pack._id}`)
        }

        const removePack = (event: React.MouseEvent<HTMLElement>) => {
          event.stopPropagation()
          dispatch(deletePackTC(pack._id))
        }

        const editPack = (event: React.MouseEvent<HTMLElement>) => {
          event.stopPropagation()
          dispatch(editPackTC(pack._id))
        }

        return (
          <TableRow
            key={pack._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            className={style['table-row']}
            onClick={getPackId}
          >
            <TableCell component="th" scope="row">
              {pack.name}
            </TableCell>

            <TableCell align="center">{pack.cardsCount}</TableCell>
            <TableCell align="center" className={tableStyle['sorting-cell']}>
              {pack.updated.slice(0, 10)}
            </TableCell>
            <TableCell align="right" className={tableStyle['created-cell']}>
              {pack.user_name}
            </TableCell>

            <TableCell align="right">
              {userID === pack.user_id ? (
                <div>
                  <IconButton disabled={pack.cardsCount === 0}>
                    <SchoolIcon />
                  </IconButton>
                  <IconButton onClick={editPack}>
                    <ModeEditIcon />
                  </IconButton>
                  <IconButton disabled={entityStatus === 'loading'} onClick={removePack}>
                    <WhatshotIcon color={entityStatus === 'loading' ? 'inherit' : 'primary'} />
                  </IconButton>
                </div>
              ) : (
                <IconButton disabled={pack.cardsCount === 0}>
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

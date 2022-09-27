import React from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { IconButton, TableCell, TableRow } from '@mui/material'

import { useAppDispatch } from '../../../../common/hooks/useAppDispatch'
import { CardType } from '../cards-api'
import { deleteCardTC, updateCardTC } from '../cards-reducer'

type PropsType = {
  packID: string
  card: CardType
  isMyPack: boolean
}

export const CardTableRow = ({ packID, card, isMyPack }: PropsType) => {
  const dispatch = useAppDispatch()

  const deleteCard = () => {
    dispatch(deleteCardTC(packID, card._id))
  }

  const updateCard = () => {
    dispatch(
      updateCardTC(packID, {
        _id: card._id,
        answer: `updated answer`,
        question: `updated question`,
      })
    )
  }

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {card.question}
      </TableCell>
      <TableCell>{card.answer}</TableCell>
      <TableCell align="right">{card.updated}</TableCell>
      <TableCell align="right">{card.grade}</TableCell>
      {isMyPack && (
        <TableCell align="right">
          <IconButton onClick={updateCard}>
            <ModeEditIcon />
          </IconButton>
          <IconButton onClick={deleteCard}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  )
}

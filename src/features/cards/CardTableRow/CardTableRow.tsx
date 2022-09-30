import React from 'react'

import ModeEditIcon from '@mui/icons-material/ModeEdit'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import { IconButton, Rating, TableCell, TableRow } from '@mui/material'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import tableStyles from '../../../styles/study-table.module.css'
import { CardDomainType, deleteCardTC, updateCardTC } from '../cards-reducer'

type PropsType = {
  packID: string
  card: CardDomainType
  isMyPack: boolean
}

export const CardTableRow = ({ card, isMyPack }: PropsType) => {
  const dispatch = useAppDispatch()

  const deleteCard = () => {
    dispatch(deleteCardTC(card._id))
  }

  const updateCard = () => {
    dispatch(
      updateCardTC({
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
      <TableCell align="center">{card.updated.slice(0, 10)}</TableCell>
      <TableCell align="center" className={tableStyles['grade-cell']}>
        <Rating name="read-only" value={card.grade} precision={0.5} readOnly />
      </TableCell>
      {isMyPack && (
        <TableCell align="right" className={tableStyles['actions-cell']}>
          <IconButton onClick={updateCard} disabled={card.status === 'loading'}>
            <ModeEditIcon />
          </IconButton>
          <IconButton onClick={deleteCard} disabled={card.status === 'loading'}>
            <WhatshotIcon color={card.status === 'loading' ? 'inherit' : 'primary'} />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  )
}

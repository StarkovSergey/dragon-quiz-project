import React, { useState } from 'react'

import ModeEditIcon from '@mui/icons-material/ModeEdit'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import { IconButton, Rating, TableCell, TableRow } from '@mui/material'

import { DeleteModal } from '../../../common/components/modals/DeleteModal/DeleteModal'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import tableStyles from '../../../styles/study-table.module.css'
import { CardModal } from '../CardModal/CardModal'
import { CardDomainType, deleteCardTC, updateCardTC } from '../cards-slice'

type PropsType = {
  packID: string
  card: CardDomainType
  isMyPack: boolean
}

export const CardTableRow = ({ card, isMyPack }: PropsType) => {
  const dispatch = useAppDispatch()
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)

  const deleteCardButtonHandler = () => {
    setOpenDeleteModal(true)
  }
  const deleteCard = () => {
    dispatch(deleteCardTC(card._id))
  }
  const updateCardButtonHandler = () => {
    setOpenEditModal(true)
  }

  const updateCard = (param: { answer: string; question?: string; questionImg?: string }) => {
    dispatch(
      updateCardTC({
        _id: card._id,
        answer: param.answer,
        question: param.question,
        questionImg: param.questionImg,
        type: param.questionImg ? 'image' : 'card',
      })
    )
  }

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {card.type === 'card' ? (
          card.question
        ) : (
          <div className={tableStyles['table-image']}>
            <img src={card.questionImg} />
          </div>
        )}
      </TableCell>
      <TableCell>{card.answer}</TableCell>
      <TableCell align="center">{card.updated.slice(0, 10)}</TableCell>
      <TableCell align="center" className={tableStyles['grade-cell']}>
        <Rating name="read-only" value={card.grade} precision={0.5} readOnly />
      </TableCell>
      {isMyPack && (
        <TableCell align="right" className={tableStyles['actions-cell']}>
          <IconButton onClick={updateCardButtonHandler} disabled={card.status === 'loading'}>
            <ModeEditIcon />
          </IconButton>
          <IconButton onClick={deleteCardButtonHandler} disabled={card.status === 'loading'}>
            <WhatshotIcon color={card.status === 'loading' ? 'inherit' : 'primary'} />
          </IconButton>

          <DeleteModal
            title="Delete Card"
            message={`Do you really want to remove ${card.answer}?`}
            open={openDeleteModal}
            toggleOpenMode={setOpenDeleteModal}
            deleteItem={deleteCard}
          />
          <CardModal
            title="Edit card"
            open={openEditModal}
            toggleOpenMode={setOpenEditModal}
            saveCard={updateCard}
            answerText={card.answer}
            questionText={card.question}
            questionType={card.type}
            isEdit={true}
            questionImg={card.questionImg}
          />
        </TableCell>
      )}
    </TableRow>
  )
}

import React, { useEffect } from 'react'

import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper } from '@mui/material'
import { useParams } from 'react-router-dom'

import { Button } from '../../common/components/Button/Button'
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks'

import { createCardTC, setCardsTC } from './cards-reducer'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.cards)
  const isMyPack = useAppSelector(state => state.cards.isMyPack)

  const { packID } = useParams()

  useEffect(() => {
    dispatch(setCardsTC(packID!))
  }, [])

  const addNewCard = () => {
    dispatch(createCardTC({ cardsPack_id: packID! }))
  }

  return (
    <div>
      {isMyPack && (
        <Button onClick={addNewCard} art>
          Add new card
        </Button>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead
            sx={{
              backgroundColor: '#f2a278',
            }}
          >
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Answer</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell>Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.cards.map(card => (
              <TableRow key={card._id}>
                <TableCell component="th" scope="row">
                  {card.question}
                </TableCell>
                <TableCell>{card.answer}</TableCell>
                <TableCell>{card.updated}</TableCell>
                <TableCell>{card.grade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

import React, { useEffect } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper, IconButton } from '@mui/material'
import { useParams } from 'react-router-dom'

import { Button } from '../../common/components/Button/Button'
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks'

import { createCardTC, setCardsTC } from './cards-reducer'
import { CardTableRow } from './CardTableRow/CardTableRow'

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
              <TableCell align="right">Last Updated</TableCell>
              <TableCell align="right">Grade</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.cards.map(card => {
              return <CardTableRow key={card._id} packID={packID!} card={card} isMyPack={isMyPack} />
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

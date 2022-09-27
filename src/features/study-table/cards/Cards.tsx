import React, { useEffect } from 'react'

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useParams } from 'react-router-dom'

import { BackLink } from '../../../common/components/BackLink/BackLink'
import { Button } from '../../../common/components/Button/Button'
import { SearchBar } from '../../../common/components/SearchBar/SearchBar'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { setPacksTC } from '../packs/packs-reducer'

import { createCardTC, searchCardsTC, setCardsTC } from './cards-reducer'
import style from './Cards.module.css'
import { CardTableRow } from './CardTableRow/CardTableRow'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.cards)
  const isMyPack = useAppSelector(state => state.cards.isMyPack)

  const { packID } = useParams()
  const pack = useAppSelector(state => state.packs.packs.find(pack => pack._id === packID))

  useEffect(() => {
    dispatch(setCardsTC(packID!))
    if (!pack) {
      dispatch(setPacksTC())
    }
  }, [])

  const addNewCard = () => {
    dispatch(createCardTC({ cardsPack_id: packID! }))
  }

  const searchCard = (text: string) => {
    dispatch(searchCardsTC(packID!, text))
  }

  return (
    <div>
      <BackLink to="/" linkText="Back to Packs List" />
      <div className={style.header}>
        <h1 className={style.title}>{pack?.name}</h1>
        {isMyPack ? (
          <Button onClick={addNewCard} art>
            Add new card
          </Button>
        ) : (
          <Button>Learn to pack</Button>
        )}
      </div>
      {pack?.cardsCount !== 0 ? (
        <>
          <SearchBar search={searchCard} />
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
        </>
      ) : (
        <p className="text">
          {isMyPack
            ? 'This pack is empty. Click add new card to fill this pack'
            : 'This pack is empty. Click back to Packs list'}
        </p>
      )}
    </div>
  )
}

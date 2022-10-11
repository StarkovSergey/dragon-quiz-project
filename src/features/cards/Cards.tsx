import React, { useEffect, useState } from 'react'

import { Paper, Table, TableBody, TableContainer } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import { BackLink } from '../../common/components/BackLink/BackLink'
import { Button } from '../../common/components/Button/Button'
import { SearchBar } from '../../common/components/SearchBar/SearchBar'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import tableStyles from '../../styles/study-table.module.css'
import { setPacksTC } from '../packs/packs-reducer'

import { CardModal } from './CardModal/CardModal'
import { CardPagination } from './CardPagination/CardPagination'
import { createCardTC, searchCardsTC, setCardsTC, setPackID } from './cards-reducer'
import style from './Cards.module.css'
import { CardTableHead } from './CardTableHead/CardTableHead'
import { CardTableRow } from './CardTableRow/CardTableRow'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.cards)
  const isMyPack = useAppSelector(state => state.cards.isMyPack)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const searchText = useAppSelector(state => state.cards.search)
  const appStatus = useAppSelector(state => state.app.status)
  const navigate = useNavigate()

  const { packID } = useParams()
  const pack = useAppSelector(state => state.packs.packs.find(pack => pack._id === packID))

  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (!pack) {
      dispatch(setPacksTC())
    }
    if (packID) dispatch(setPackID({ packID }))
    dispatch(setCardsTC())
  }, [])

  const addNewCardButtonHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setOpenModal(true)
  }

  const saveCard = (question: string, answer: string) => {
    dispatch(
      createCardTC({
        cardsPack_id: packID!,
        answer,
        question,
      })
    )
  }

  const searchCard = (text: string) => {
    dispatch(searchCardsTC(text))
  }

  const onClickNavigateHandler = () => {
    if (pack !== undefined) {
      navigate(`/learn/${pack._id}`)
    }
  }

  let emptyText = ''

  if (searchText !== '') {
    emptyText = 'Nothing is found'
  } else {
    if (isMyPack) {
      emptyText = 'This pack is empty. Click add new card to fill this pack'
    } else {
      emptyText = 'This pack is empty. Click back to Packs list'
    }
  }

  const possibleLearnButton = cards.cards.length ? <Button onClick={onClickNavigateHandler}>Learn to pack</Button> : ''

  return (
    <div>
      <BackLink to="/" linkText="Back to Packs List" />
      <div className={tableStyles.header}>
        <h1 className={style.title}>{pack?.name}</h1>
        {isMyPack ? (
          <Button onClick={addNewCardButtonHandler} art disabled={appStatus === 'loading'}>
            Add new card
          </Button>
        ) : (
          possibleLearnButton
        )}
      </div>
      {(searchText || cardsTotalCount !== 0) && <SearchBar search={searchCard} className={style.search} />}
      {cardsTotalCount !== 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table className={tableStyles['table']} aria-label="customized table">
              <CardTableHead packID={packID!} />
              <TableBody>
                {cards.cards.map(card => {
                  return <CardTableRow key={card._id} packID={packID!} card={card} isMyPack={isMyPack} />
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <CardPagination packID={packID!} />
        </>
      ) : (
        <p className="text">{emptyText}</p>
      )}
      <CardModal title="Add new card" open={openModal} toggleOpenMode={setOpenModal} saveCard={saveCard} />
    </div>
  )
}

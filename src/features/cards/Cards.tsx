import React, { useEffect, useState } from 'react'

import { Paper, Table, TableBody, TableContainer } from '@mui/material'
import { useParams } from 'react-router-dom'

import { BackLink } from '../../common/components/BackLink/BackLink'
import { SearchBar } from '../../common/components/SearchBar/SearchBar'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import tableStyles from '../../styles/study-table.module.css'
import { setPacksTC } from '../packs/packs-reducer'

import { CardModal } from './CardModal/CardModal'
import { CardPagination } from './CardPagination/CardPagination'
import { createCardTC, searchCardsTC, setCardsTC, setPackID } from './cards-slice'
import style from './Cards.module.css'
import { CardTableHead } from './CardTableHead/CardTableHead'
import { CardTableRow } from './CardTableRow/CardTableRow'
import { CardTableSetting } from './CardTableSetting/CardTableSetting'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.cards)
  const isMyPack = useAppSelector(state => state.cards.isMyPack)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const searchText = useAppSelector(state => state.cards.search)
  const isCardsLoading = useAppSelector(state => state.cards.isCardsLoading)

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

  const saveCard = (param: { answer: string; question?: string; questionImg?: string }) => {
    dispatch(
      createCardTC({
        cardsPack_id: packID!,
        answer: param.answer,
        question: param.question,
        questionImg: param.questionImg,
        type: param.questionImg ? 'image' : 'card',
      })
    )
  }

  const searchCard = (text: string) => {
    dispatch(searchCardsTC(text))
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

  return (
    <div>
      <BackLink to="/" linkText="Back to Packs List" />
      <CardTableSetting
        pack={pack}
        isMyPack={isMyPack}
        addNewCardButtonHandler={addNewCardButtonHandler}
        cards={cards}
      />

      {(searchText || cardsTotalCount !== 0) && <SearchBar search={searchCard} className={style.search} />}
      {cardsTotalCount !== 0 && !isCardsLoading ? (
        <>
          <TableContainer component={Paper}>
            <Table className={tableStyles['table']} aria-label="customized table">
              <CardTableHead />
              <TableBody>
                {cards.cards.map(card => {
                  return <CardTableRow key={card._id} packID={packID!} card={card} isMyPack={isMyPack} />
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <CardPagination />
        </>
      ) : (
        <p className="text">{emptyText}</p>
      )}
      <CardModal title="Add new card" open={openModal} toggleOpenMode={setOpenModal} saveCard={saveCard} />
    </div>
  )
}

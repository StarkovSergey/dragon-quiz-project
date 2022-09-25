import React, { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks'

import { setCardsTC } from './cards-reducer'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.cards)

  const { packID } = useParams()

  useEffect(() => {
    dispatch(setCardsTC(packID!))
  }, [])

  return (
    <div>
      {cards.cards.map(card => (
        <p key={card._id}>{card.question}</p>
      ))}
    </div>
  )
}

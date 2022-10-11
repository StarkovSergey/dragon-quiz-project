import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { Button } from '../../common/components/Button/Button'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { getCard } from '../../common/utils/getCard'
import { CardType } from '../cards/cards-api'
import { setCardsTC, setGradeTC, setPackID } from '../cards/cards-reducer'

import { GradeList } from './GradeList/GradeList'
import style from './learn.module.css'

export const Learn = () => {
  const { packID } = useParams()
  const cards = useAppSelector(state => state.cards.cards)
  const pack = useAppSelector(state => state.packs.packs.find(pack => pack._id === packID))
  const dispatch = useAppDispatch()

  const [collapsedAnswer, setCollapsedAnswer] = useState(false)
  const [card, setCard] = useState<CardType | null>(null)
  const [grade, setGrade] = useState(1)

  const collapsedHandler = () => {
    setCollapsedAnswer(!collapsedAnswer)
  }

  useEffect(() => {
    setCard(getCard(cards))
  }, [cards])

  useEffect(() => {
    if (packID) dispatch(setPackID({ packID }))
    dispatch(setCardsTC())
  }, [])

  if (card === null || card === undefined) {
    return <div>крутилка</div>
  }

  const nextQuestionHandler = () => {
    dispatch(setCardsTC())
    setCard(getCard(cards))
    dispatch(setGradeTC(grade, card._id))
  }

  return (
    <div className={style.learnBlock}>
      <div className={style.learnContainer}>
        <h2 className={style.packText}> {pack?.name}</h2>
        <div>
          <h4 className={style.text}> Question: {card.question}</h4>
          <div className={style.button}>
            <Button onClick={collapsedHandler}>Show Answer</Button>
          </div>
        </div>
        <div>
          {collapsedAnswer && (
            <div>
              <h4 className={style.text}>Answer: {card.answer}</h4>
              <h5 className={style.text}>Rate yourself:</h5>
              <GradeList setGrade={setGrade} nextQuestionHandler={nextQuestionHandler} />
              <div className={style.button}>
                <Button onClick={nextQuestionHandler}>Next</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

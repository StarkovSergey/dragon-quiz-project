import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { BackLink } from '../../common/components/BackLink/BackLink'
import { Button } from '../../common/components/Button/Button'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { getCard } from '../../common/utils/getCard'
import { selectIsCardsLoading, setCardsTC, setGrade, setPackID } from '../cards'
import { CardType } from '../cards/cards-api'

import { GradeList } from './GradeList/GradeList'
import style from './learn.module.css'

export const Learn = () => {
  const { packID } = useParams()
  const cards = useAppSelector(state => state.cards.cards)
  const pack = useAppSelector(state => state.packs.packs.find(pack => pack._id === packID))
  const dispatch = useAppDispatch()
  const [collapsedAnswer, setCollapsedAnswer] = useState(false)
  const [card, setCard] = useState<CardType | null>(null)
  const [localGrade, setLocalGrade] = useState(0)
  const isCardsLoading = useAppSelector(selectIsCardsLoading)

  const collapsedHandler = () => {
    setCollapsedAnswer(!collapsedAnswer)
  }

  useEffect(() => {
    if (!cards) {
      dispatch(setCardsTC)
    }
  })

  useEffect(() => {
    setCard(getCard(cards))
  }, [cards])

  useEffect(() => {
    if (packID) dispatch(setPackID({ packID }))
    dispatch(setCardsTC())
  }, [])

  if (card === null || card === undefined) {
    return <div></div>
  }

  const nextQuestionHandler = () => {
    if (localGrade !== 0) {
      dispatch(
        setGrade({
          grade: localGrade,
          cardID: card._id,
        })
      )
      setCollapsedAnswer(false)
      setLocalGrade(0)
    }
  }

  return (
    <div>
      <BackLink to="/" linkText="Back to Packs List" />
      <div className={style.learnBlock}>
        <h2 className="section-title"> {pack?.name}</h2>

        {!isCardsLoading && (
          <div>
            <div>
              {card.type === 'card' ? (
                <p className={style.text}>
                  <b>Question</b>: {card.question}
                </p>
              ) : (
                <img src={card.questionImg} alt="question image" />
              )}
              <div className={style.button}>
                <Button onClick={collapsedHandler}>Show Answer</Button>
              </div>
            </div>
            <div>
              {collapsedAnswer && (
                <div>
                  <div className={style.text}>
                    <p>
                      <b>Answer</b>: {card.answer}
                    </p>
                    <GradeList grade={localGrade} setGrade={setLocalGrade} />
                  </div>
                  <div className={style.button}>
                    <Button onClick={nextQuestionHandler} disabled={localGrade === 0}>
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

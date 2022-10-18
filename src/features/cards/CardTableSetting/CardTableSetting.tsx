import React from 'react'

import { useNavigate } from 'react-router-dom'

import { Button } from '../../../common/components/Button/Button'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import tableStyles from '../../../styles/study-table.module.css'
import { PackDomainType } from '../../packs/packs-reducer'
import { CardStateType } from '../cards-slice'
import style from '../Cards.module.css'

type PropsType = {
  pack: PackDomainType | undefined
  isMyPack: boolean
  addNewCardButtonHandler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  cards: CardStateType
}

export const CardTableSetting = ({ pack, isMyPack, addNewCardButtonHandler, cards }: PropsType) => {
  const appStatus = useAppSelector(state => state.app.status)

  const navigate = useNavigate()

  const onClickNavigateHandler = () => {
    if (pack !== undefined) {
      navigate(`/learn/${pack._id}`)
    }
  }

  const possibleLearnButton = cards.cards.length ? <Button onClick={onClickNavigateHandler}>Learn to pack</Button> : ''

  return (
    <div className={tableStyles.header}>
      <h1 className={style.title}>{pack?.name}</h1>
      {pack?.deckCover && (
        <div className={style['pack-cover']}>
          <img src={pack.deckCover} alt="pack cover" />
        </div>
      )}
      {isMyPack ? (
        <Button onClick={addNewCardButtonHandler} art disabled={appStatus === 'loading'}>
          Add new card
        </Button>
      ) : (
        possibleLearnButton
      )}
    </div>
  )
}

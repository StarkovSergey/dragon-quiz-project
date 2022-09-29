import React, { useEffect, useState } from 'react'

import { RangeSlider } from '../../../../../common/components/RangeSlider/Slider'
import { useAppDispatch } from '../../../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../../../common/hooks/useAppSelector'
import { setMaxCardsCount, setMinCardsCount } from '../../packs-reducer'
import style from '../../packs.module.css'

export const NumberOfCards = () => {
  const minCardsCount = useAppSelector(state => state.packs.min)
  const maxCardsCount = useAppSelector(state => state.packs.max)
  const [value, setValue] = useState<[number, number]>([minCardsCount, maxCardsCount])
  const dispatch = useAppDispatch()

  useEffect(() => {
    setValue([minCardsCount, maxCardsCount])
  }, [minCardsCount, maxCardsCount])

  const onChangeValueDoubleRange = (value: [number, number]) => {
    setValue(value)
    dispatch(setMinCardsCount({ min: value[0] }))
    dispatch(setMaxCardsCount({ max: value[1] }))
  }

  return (
    <div className={style['slider-box']}>
      <p className={style.label}>Number of cards</p>
      <div className={style.slider}>
        <span>{value[0]}</span>
        <RangeSlider value={value} setValue={onChangeValueDoubleRange} />
        <span>{value[1]}</span>
      </div>
    </div>
  )
}

import React, { useState } from 'react'

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

  const onChangeValueDoubleRange = (value: [number, number]) => {
    setValue(value)
    dispatch(setMinCardsCount({ min: value[0] }))
    dispatch(setMaxCardsCount({ max: value[1] }))
  }

  return (
    <div>
      <h4>Number of cards</h4>
      <div className={style.sliderBlock}>
        {value[0]}
        <RangeSlider value={value} setValue={onChangeValueDoubleRange} />
        {value[1]}
      </div>
    </div>
  )
}

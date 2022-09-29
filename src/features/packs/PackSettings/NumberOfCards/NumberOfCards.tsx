import React, { useEffect, useState } from 'react'

import { RangeSlider } from '../../../../common/components/RangeSlider/Slider'
import { useAppDispatch } from '../../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../../common/hooks/useAppSelector'
import { useDebounce } from '../../../../common/hooks/useDebounce'
import { setPacksTC } from '../../packs-reducer'
import style from '../../packs.module.css'

export const NumberOfCards = () => {
  const minCardsCount = useAppSelector(state => state.packs.min)
  const maxCardsCount = useAppSelector(state => state.packs.max)
  const [defaultValue, setDefaultValue] = useState<[number, number]>([minCardsCount, maxCardsCount])
  const [firstValue, setFirstValue] = useState(0)
  const [secondValue, setSecondValue] = useState(50)
  const dispatch = useAppDispatch()

  const debouncedMin = useDebounce(firstValue, 500)
  const debouncedMax = useDebounce(secondValue, 500)

  const onChangeValueDoubleRange = (value: [number, number]) => {
    setFirstValue(value[0])
    setSecondValue(value[1])
  }

  useEffect(() => {
    dispatch(setPacksTC(debouncedMin, debouncedMax))
  }, [debouncedMin, debouncedMax])

  useEffect(() => {
    setDefaultValue([minCardsCount, maxCardsCount])
  }, [minCardsCount, maxCardsCount])

  return (
    <div className={style['slider-box']}>
      <p className={style.label}>Number of cards</p>
      <div className={style.slider}>
        <span>{firstValue}</span>
        <RangeSlider
          defaultValue={defaultValue}
          firstValue={firstValue}
          secondValue={secondValue}
          setValue={onChangeValueDoubleRange}
        />
        <span>{secondValue}</span>
      </div>
    </div>
  )
}

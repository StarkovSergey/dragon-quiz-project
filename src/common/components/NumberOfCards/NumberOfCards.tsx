import React, { useState } from 'react'

import { setValueSlider } from '../../../features/study-table/packs/packs-reducer'
import style from '../../../features/study-table/packs/packs.module.css'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { RangeSlider } from '../Slider/Slider'

export const NumberOfCards = () => {
  const [value, setValue] = useState<[number, number]>([0, 100])
  const dispatch = useAppDispatch()

  const onChangeValueDoubleRange = (value: [number, number]) => {
    setValue(value)
    dispatch(setValueSlider({ min: value[0], max: value[1] }))
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

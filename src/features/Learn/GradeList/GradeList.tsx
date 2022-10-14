import React, { ChangeEvent } from 'react'

import { FormControlLabel, Radio } from '@mui/material'

import style from './../learn.module.css'

type GradeListType = {
  grade: number
  setGrade: (value: number) => void
}

export const GradeList = ({ grade, setGrade }: GradeListType) => {
  const grades = [
    {
      grade: 1,
      text: 'Did not know',
    },
    {
      grade: 2,
      text: 'Forgot',
    },
    {
      grade: 3,
      text: 'A lot of thought',
    },
    {
      grade: 4,
      text: 'Confused',
    },
    {
      grade: 5,
      text: 'Knew the answer',
    },
  ]

  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    setGrade(+e.currentTarget.value)
  }

  return (
    <div>
      <b id="question-type">Rate yourself:</b>
      <ul className={style['grade-list']}>
        {grades.map((el, i) => {
          return (
            <li key={i}>
              <FormControlLabel
                value={el.grade}
                control={<Radio checked={el.grade === grade} onChange={onChangeCallback} size="small" />}
                label={el.text}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

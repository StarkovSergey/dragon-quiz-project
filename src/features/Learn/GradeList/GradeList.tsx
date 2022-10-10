import React from 'react'

import { Checkbox } from '../../../common/components/Checkbox/Checkbox'
import style from '../learn.module.css'

type GradeListType = {
  setGrade: (value: number) => void
  nextQuestionHandler: () => void
}

export const GradeList = ({ setGrade }: GradeListType) => {
  const grades = [
    { grade: 1, text: 'Did not know' },
    { grade: 2, text: 'Forgot' },
    { grade: 3, text: 'A lot of thought' },
    { grade: 4, text: 'Confused' },
    { grade: 5, text: 'Knew the answer' },
  ]

  return (
    <div>
      <div className={`${style.grade} ${style.text}`}>
        {grades.map(el => {
          const gradeSetChanged = () => {
            setGrade(el.grade)
          }

          return (
            <div key={el.grade}>
              <Checkbox onChange={gradeSetChanged} /> <span>{el.text}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

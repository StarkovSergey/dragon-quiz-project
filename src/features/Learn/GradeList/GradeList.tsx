import React, { ChangeEvent } from 'react'

type GradeListType = {
  grade: number
  setGrade: (value: number) => void
}

export const GradeList = ({ grade, setGrade }: GradeListType) => {
  const grades = [
    { grade: 1, text: 'Did not know' },
    { grade: 2, text: 'Forgot' },
    { grade: 3, text: 'A lot of thought' },
    { grade: 4, text: 'Confused' },
    { grade: 5, text: 'Knew the answer' },
  ]

  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    setGrade(+e.currentTarget.value)
  }

  return (
    <div>
      {grades.map((el, i) => {
        return (
          <div key={i}>
            <input type={'radio'} value={el.grade} onChange={onChangeCallback} checked={el.grade === grade} />
            {el.text}
          </div>
        )
      })}
    </div>
  )
}

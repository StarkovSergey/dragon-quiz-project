import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'

import { Button } from '../../../common/components/Button/Button'
import { InputText } from '../../../common/components/InputText/InputText'
import { BasicModal } from '../../../common/components/modals/BasicModal/BasicModal'

import style from './CardModal.module.css'

type PropsType = {
  title: string
  open: boolean
  toggleOpenMode: (value: boolean) => void
  saveCard: (question: string, answer: string) => void
  isAddNewItem?: boolean
  questionText?: string
  answerText?: string
  isEdit?: boolean
}

export const CardModal: React.FC<PropsType> = ({
  title,
  open,
  toggleOpenMode,
  saveCard,
  questionText = '',
  answerText = '',
  isEdit = false,
}) => {
  const [question, setQuestion] = useState(questionText)
  const [answer, setAnswer] = useState(answerText)

  const questionChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setQuestion(evt.currentTarget.value)
  }
  const answerChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setAnswer(evt.currentTarget.value)
  }

  const answerInputRef = useRef<HTMLInputElement>(null)

  const inputQuestionKeyDownHandler = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      const answerInput = answerInputRef.current as HTMLInputElement

      answerInput.focus()
    }
  }

  const inputAnswerKeyDownHandler = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      saveButtonHandler()
    }
  }

  const saveButtonHandler = () => {
    saveCard(question, answer)
    onCloseModal()
  }

  const onCloseModal = () => {
    toggleOpenMode(false)

    if (isEdit) {
      return
    }
    setAnswer('')
    setQuestion('')
  }

  return (
    <BasicModal title={title} open={open} toggleOpenMode={toggleOpenMode} onCloseModal={onCloseModal}>
      <InputText
        value={question}
        onChange={questionChangeHandler}
        onKeyDown={inputQuestionKeyDownHandler}
        label="Question"
        className={style.input}
        autoFocus
      />
      <InputText
        value={answer}
        onChange={answerChangeHandler}
        onKeyDown={inputAnswerKeyDownHandler}
        label="Answer"
        className={style.input}
        ref={answerInputRef}
      />
      <div className={style['button-box']}>
        <Button onClick={saveButtonHandler} art>
          Save
        </Button>
        <Button onClick={onCloseModal}>Cancel</Button>
      </div>
    </BasicModal>
  )
}

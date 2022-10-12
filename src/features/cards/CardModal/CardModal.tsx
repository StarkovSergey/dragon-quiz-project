import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

import dragonImg from '../../../assets/images/dragon.png'
import { Button } from '../../../common/components/Button/Button'
import { ImageUploader } from '../../../common/components/ImageUploader/ImageUploader'
import { InputText } from '../../../common/components/InputText/InputText'
import { BasicModal } from '../../../common/components/modals/BasicModal/BasicModal'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { uploadFileHandler } from '../../../common/utils/uploadFileHandler'
import { QuestionType } from '../cards-api'

import style from './CardModal.module.css'

type PropsType = {
  title: string
  open: boolean
  toggleOpenMode: (value: boolean) => void
  saveCard: (param: { answer: string; question?: string; questionImg?: string }) => void
  isAddNewItem?: boolean
  questionText?: string
  answerText?: string
  isEdit?: boolean
  questionType?: QuestionType
  questionImg?: string
}

export const CardModal: React.FC<PropsType> = ({
  title,
  open,
  toggleOpenMode,
  saveCard,
  questionText = '',
  answerText = '',
  isEdit = false,
  questionType = 'card',
  ...props
}) => {
  const [question, setQuestion] = useState(questionText)
  const [questionImg, setQuestionImg] = useState(props.questionImg || '')
  const [localQuestionType, setLocalQuestionType] = useState<QuestionType>(questionType)
  const [answer, setAnswer] = useState(answerText)
  const dispatch = useAppDispatch()

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
    if (localQuestionType === 'card') {
      saveCard({
        answer,
        question,
      })
    } else {
      saveCard({
        answer,
        questionImg,
      })
    }
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

  const changeRadioButtonHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value as QuestionType

    setLocalQuestionType(value)
  }

  const uploadQuestionImage = (e: ChangeEvent<HTMLInputElement>) => {
    uploadFileHandler(
      e,
      (file64: string) => {
        setQuestionImg(file64)
      },
      dispatch
    )
  }

  return (
    <BasicModal title={title} open={open} toggleOpenMode={toggleOpenMode} onCloseModal={onCloseModal}>
      <FormControl>
        <FormLabel id="question-type">Card Type</FormLabel>
        <RadioGroup row aria-labelledby="question-type" name="row-radio-buttons-group">
          <FormControlLabel
            value="card"
            control={<Radio checked={localQuestionType === 'card'} onChange={changeRadioButtonHandler} />}
            label="Text"
          />
          <FormControlLabel
            value="image"
            control={<Radio checked={localQuestionType === 'image'} onChange={changeRadioButtonHandler} />}
            label="Image"
          />
        </RadioGroup>
      </FormControl>

      {localQuestionType === 'card' ? (
        <InputText
          value={question}
          onChange={questionChangeHandler}
          onKeyDown={inputQuestionKeyDownHandler}
          label="Question"
          className={style.input}
          autoFocus
        />
      ) : (
        <ImageUploader callback={uploadQuestionImage} image={questionImg} />
      )}

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

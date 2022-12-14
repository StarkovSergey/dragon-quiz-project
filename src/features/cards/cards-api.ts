import { instance } from '../../common/api-instances/instance'

export const cardsAPI = {
  getCards(cardsPackID: string, params: GetCardsParamsType) {
    return instance.get<getCardsResponseType>(`cards/card`, {
      params: {
        cardsPack_id: cardsPackID,
        cardQuestion: params.search,
        ...params,
      },
    })
  },
  createCard(card: CardModelType) {
    return instance.post(`cards/card`, {
      card: {
        question: 'no question',
        answer: 'no answer',
        ...card,
      },
    })
  },
  deleteCard(cardID: string) {
    return instance.delete(`cards/card?id=${cardID}`)
  },
  updateCard(card: UpdateCardModelType) {
    return instance.put(`cards/card`, { card })
  },
  getGrade(grade: number, card_id: string) {
    return instance.put('/cards/grade', {
      grade,
      card_id,
    })
  },
}

// types
export type UpdateCardModelType = {
  _id: string
  question?: string
  answer?: string
  shots?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
  type?: QuestionType
}

export type QuestionType = 'card' | 'image'

export type CardModelType = {
  cardsPack_id: string
  question?: string
  answer?: string
  grade?: number
  shots?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
  type?: QuestionType
}

export type getCardsResponseType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}

export type CardType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
  questionImg: string
  type?: QuestionType
}

export type GetCardsParamsType = {
  search: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}

export type RequestGradeType = {
  grade: number
  card_id: string
}

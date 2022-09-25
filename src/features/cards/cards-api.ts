import { instance } from '../../common/instance/instance'

export const cardsAPI = {
  getCards(cardsPackID: string, params?: GetCardsParamsType) {
    return instance.get<getCardsResponseType>(`cards/card`, {
      params: {
        cardsPack_id: cardsPackID,
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
}

// types
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
}

type getCardsResponseType = {
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
}

export type GetCardsParamsType = {
  cardAnswer?: string
  cardQuestion?: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}

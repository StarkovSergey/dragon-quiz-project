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
}

// types
type getCardsResponseType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserID: string
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

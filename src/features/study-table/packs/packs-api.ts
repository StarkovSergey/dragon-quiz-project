import { instance } from '../../../common/instance/instance'

export const packAPI = {
  getPack(params: GetPackParamsType) {
    return instance.get<ResponsePackType>('/cards/pack', {
      params: {
        pageCount: 10,
        ...params,
      },
    })
  },
}

// types
export type PackDataType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
  user_name: string
}

export type ResponsePackType = {
  cardPacks: PackDataType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
  token: string
  tokenDeathTime: number
}

export type GetPackParamsType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id: string | null
}

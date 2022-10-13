import { instance } from '../../common/api-instances/instance'

export const packAPI = {
  getPack(params: GetPackParamsType) {
    return instance.get<ResponsePackType>('/cards/pack', { params })
  },
  addNewPack(cardsPack: NewPackType) {
    return instance.post('/cards/pack', { cardsPack })
  },
  deletePack(id: string) {
    return instance.delete(`/cards/pack?id=${id}`)
  },
  updatePack(cardsPack: EditPackType) {
    return instance.put('/cards/pack', { cardsPack })
  },
}

// types
export type EditPackType = {
  _id: string
  name?: string
  deckCover?: string
}

export type NewPackType = {
  name: string
  deckCover?: string
  private?: boolean
}

export type PackType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
  user_name: string
  deckCover?: string
}

export type ResponsePackType = {
  cardPacks: PackType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
  token: string
  tokenDeathTime: number
}

export type GetPackParamsType = {
  pageCount?: number
  page?: number
  sortPacks?: SortType
  packName?: string
  min?: number
  max?: number
  user_id?: string | null
  isMyPacks?: boolean
}

export type SortType = '0updated' | '1updated' | '0created' | '1created'

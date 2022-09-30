import { instance } from '../../common/api-instances/instance'

export const packAPI = {
  getPack(params: GetPackParamsType) {
    return instance.get<ResponsePackType>('/cards/pack', { params })
  },
  addNewPack(cardsPack: newPackType) {
    return instance.post('/cards/pack', { cardsPack })
  },
  deletePack(id: string) {
    return instance.delete(`/cards/pack?id=${id}`)
  },
  updatePack(id: string, title: string) {
    return instance.put('/cards/pack', {
      cardsPack: {
        _id: id,
        name: title,
      },
    })
  },
}

// types

type newPackType = {
  name: string
  private: boolean
}

export type PackType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
  user_name: string
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

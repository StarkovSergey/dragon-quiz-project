import { instance } from '../../../common/instance/instance'

export const packAPI = {
  getPack({ isMyPacks, page, pageCount, userID, max, min, sort, search }: GetPackParamsType) {
    const params: any = {
      packName: search,
      min,
      max,
      sortPacks: sort,
      page,
      pageCount,
    }

    if (isMyPacks) {
      params.user_id = userID
    }

    return instance.get<ResponsePackType>('/cards/pack', {
      params,
    })
  },
  addNewPack(cardsPack: newPackType) {
    return instance.post('/cards/pack', { cardsPack })
  },
}

// types

type newPackType = {
  name: string
  private: boolean
}

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
  pageCount?: number
  page?: number
  sort?: sortType
  search?: string
  min?: number
  max?: number
  userID?: string
  isMyPacks?: boolean
}

export type sortType = '0updated' | '1updated' | '0created' | '1created'

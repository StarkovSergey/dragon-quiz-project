import { AppRootStateType } from '../../app/store'

export const selectIsMyPack = (state: AppRootStateType) => state.cards.isMyPack
export const selectSortingCards = (state: AppRootStateType) => state.cards.sortCards

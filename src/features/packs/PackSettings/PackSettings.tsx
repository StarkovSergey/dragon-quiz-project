import React from 'react'

import { Button } from '../../../common/components/Button/Button'
import { SearchBar } from '../../../common/components/SearchBar/SearchBar'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import tableStyles from '../../../styles/study-table.module.css'
import { addNewPackTC, resetFilters, searchPacksTC, setCardsRange, setPacksTC } from '../packs-reducer'
import style from '../packs.module.css'

import { NumberOfCards } from './NumberOfCards/NumberOfCards'
import { ShowCardsPack } from './ShowPacksCards/ShowCardsPack'

export const PackSettings = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.packs.addingNewPackStatus)
  const searchText = useAppSelector(state => state.packs.search)
  const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)

  const searchPack = (text: string) => {
    dispatch(searchPacksTC(text))
  }

  const addNewPack = () => {
    dispatch(addNewPackTC())
  }

  const resetFilterHandler = () => {
    dispatch(setCardsRange({ min: minCardsCount, max: maxCardsCount }))
    dispatch(resetFilters({ min: minCardsCount, max: maxCardsCount, search: '' }))
    dispatch(setPacksTC())
  }

  return (
    <div>
      <div className={tableStyles.header}>
        <h2>Pack list</h2>
        <Button onClick={addNewPack} art disabled={status === 'loading'}>
          Add new pack
        </Button>
      </div>
      <div className={style.settings}>
        <SearchBar searchText={searchText} search={searchPack} className={style.search} />
        <ShowCardsPack />
        <NumberOfCards />
        <button onClick={resetFilterHandler} className={style['filter-button']}></button>
      </div>
    </div>
  )
}

import React from 'react'

import { Button } from '../../../common/components/Button/Button'
import { SearchBar } from '../../../common/components/SearchBar/SearchBar'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import tableStyles from '../../../styles/study-table.module.css'
import { addNewPackTC, searchPacksTC } from '../packs-reducer'
import style from '../packs.module.css'

import { NumberOfCards } from './NumberOfCards/NumberOfCards'
import { ShowCardsPack } from './ShowPacksCards/ShowCardsPack'

export const PackSettings = () => {
  const dispatch = useAppDispatch()

  const searchPack = (text: string) => {
    dispatch(searchPacksTC(text))
  }

  const addNewPack = () => {
    dispatch(addNewPackTC())
  }

  return (
    <div>
      <div className={tableStyles.header}>
        <h2>Pack list</h2>
        <Button onClick={addNewPack} art>
          Add new pack
        </Button>
      </div>
      <div className={style.settings}>
        <SearchBar search={searchPack} className={style.search} />
        <ShowCardsPack />
        <NumberOfCards />
        <button className={style['filter-button']}></button>
      </div>
    </div>
  )
}
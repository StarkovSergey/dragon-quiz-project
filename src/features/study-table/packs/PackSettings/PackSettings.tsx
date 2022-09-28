import React from 'react'

import { Button } from '../../../../common/components/Button/Button'
import { NumberOfCards } from '../../../../common/components/NumberOfCards/NumberOfCards'
import { SearchBar } from '../../../../common/components/SearchBar/SearchBar'
import { ShowCardsPack } from '../../../../common/components/ShowPacksCards/ShowCardsPack'
import { useAppDispatch } from '../../../../common/hooks/useAppDispatch'
import { addNewPckTC, searchPacksTC } from '../packs-reducer'
import style from '../packs.module.css'

export const PackSettings = () => {
  const dispatch = useAppDispatch()

  const searchPack = (text: string) => {
    dispatch(searchPacksTC(text))
  }

  const addNewPack = () => {
    dispatch(addNewPckTC())
  }

  return (
    <div>
      <div className={style.packList}>
        <h2>Pack list</h2>
        <Button onClick={addNewPack}>Add new pack</Button>
      </div>
      <div className={style.settings}>
        <SearchBar search={searchPack} />
        <ShowCardsPack />
        <NumberOfCards />
        <Button>Filter</Button>
      </div>
    </div>
  )
}

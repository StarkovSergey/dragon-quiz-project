import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

import cardsStyle from '../../../features/study-table/cards/Cards.module.css'
import { SearchInput } from '../SearchInput/SearchInput'

import style from './SearchBar.module.css'

type PropsType = {
  search: (text: string) => void
}

export const SearchBar = ({ search }: PropsType) => {
  const [searchText, setSearchText] = useState('')

  const inputChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchText(evt.currentTarget.value)
  }

  const inputKeyDownHandler = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      search(searchText)
      setSearchText('')
    }
  }

  return (
    <div className={cardsStyle.search}>
      <SearchInput value={searchText} onChange={inputChangeHandler} onKeyDown={inputKeyDownHandler} />
    </div>
  )
}

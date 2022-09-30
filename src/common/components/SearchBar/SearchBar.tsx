import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'

import { useDebounce } from '../../hooks/useDebounce'
import { SearchInput } from '../SearchInput/SearchInput'

type PropsType = {
  search: (text: string) => void
  className?: string
  searchText?: string
}

export const SearchBar = ({ search, className, searchText, ...restProps }: PropsType) => {
  const [text, setSearchText] = useState(searchText)
  const debouncedText = useDebounce<string | undefined>(text, 500)
  const inputChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchText(evt.currentTarget.value)
  }

  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false

      return
    }
    search(debouncedText!)
  }, [debouncedText])

  const inputKeyDownHandler = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Escape') {
      setSearchText('')
    }
  }

  return (
    <div className={className}>
      <SearchInput value={searchText} onChange={inputChangeHandler} onKeyDown={inputKeyDownHandler} />
    </div>
  )
}

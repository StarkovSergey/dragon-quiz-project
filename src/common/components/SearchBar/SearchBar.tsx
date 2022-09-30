import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'

import { useDebounce } from '../../hooks/useDebounce'
import { SearchInput } from '../SearchInput/SearchInput'

type PropsType = {
  search: (text: string) => void
  className?: string
  searchText?: string
}

export const SearchBar = ({ search, className, searchText = '', ...restProps }: PropsType) => {
  const [text, setText] = useState(searchText)
  const debouncedText = useDebounce<string>(text, 500)

  useEffect(() => {
    setText(searchText)
  }, [searchText])

  const inputChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setText(evt.currentTarget.value)
  }

  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false

      return
    }
    search(debouncedText)
  }, [debouncedText])

  const inputKeyDownHandler = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Escape') {
      setText('')
    }
  }

  return (
    <div className={className}>
      <SearchInput value={text} onChange={inputChangeHandler} onKeyDown={inputKeyDownHandler} />
    </div>
  )
}

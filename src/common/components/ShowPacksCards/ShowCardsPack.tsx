import React from 'react'

import { setIsMyPacksTC } from '../../../features/study-table/packs/packs-reducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { Button } from '../Button/Button'

export const ShowCardsPack = () => {
  const dispatch = useAppDispatch()
  const showMyPacks = () => {
    dispatch(setIsMyPacksTC(true))
  }

  const showAllPacks = () => {
    dispatch(setIsMyPacksTC(false))
  }

  return (
    <div>
      <h4>Show packs cards</h4>
      <Button onClick={showMyPacks}>My</Button>
      <Button onClick={showAllPacks}>All</Button>
    </div>
  )
}

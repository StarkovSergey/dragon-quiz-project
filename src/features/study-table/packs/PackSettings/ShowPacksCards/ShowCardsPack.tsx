import React from 'react'

import { Button } from '../../../../../common/components/Button/Button'
import { useAppDispatch } from '../../../../../common/hooks/useAppDispatch'
import { setIsMyPacksTC } from '../../packs-reducer'

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

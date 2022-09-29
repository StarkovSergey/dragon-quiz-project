import React from 'react'

import { FormControlLabel, Switch } from '@mui/material'

import { useAppDispatch } from '../../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../../common/hooks/useAppSelector'
import { setIsMyPacksTC } from '../../packs-reducer'

export const ShowCardsPack = () => {
  const dispatch = useAppDispatch()
  const isMyPacks = useAppSelector(state => state.packs.isMyPacks)
  const appStatus = useAppSelector(state => state.app.status)

  const switchHandler = () => {
    dispatch(setIsMyPacksTC(!isMyPacks))
  }

  return (
    <div>
      <div>
        <FormControlLabel
          control={<Switch checked={isMyPacks} onChange={switchHandler} disabled={appStatus === 'loading'} />}
          label="Show my packs"
        />
      </div>
    </div>
  )
}

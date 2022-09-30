import { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'

import { setPacksTC } from './packs-reducer'
import { PackSettings } from './PackSettings/PackSettings'
import { PackTable } from './PackTable/PackTable'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const searchText = useAppSelector(state => state.packs.search)
  const packs = useAppSelector(state => state.packs.packs)
  const isMyPack = useAppSelector(state => state.packs.isMyPacks)

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    setSearchParams({ my: isMyPack ? '1' : '0' })
  }, [isMyPack])

  useEffect(() => {
    dispatch(setPacksTC({ isMyPack: searchParams.get('my') === '1' }))
  }, [])

  return (
    <div>
      <PackSettings />
      {searchText !== '' && packs.length === 0 ? <p className="text">Nothing is found</p> : <PackTable />}
    </div>
  )
}

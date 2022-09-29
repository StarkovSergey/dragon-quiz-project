import { useEffect } from 'react'

import { Navigate } from 'react-router-dom'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { Paths } from '../../../common/routes'

import { setPacksTC } from './packs-reducer'
import { PackSettings } from './PackSettings/PackSettings'
import { PackTable } from './PackTable/PackTable'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const searchText = useAppSelector(state => state.packs.search)
  const packs = useAppSelector(state => state.packs.packs)

  useEffect(() => {
    dispatch(setPacksTC())
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={Paths.SingIn} />
  }

  return (
    <div>
      <PackSettings />
      {searchText !== '' && packs.length === 0 ? <p className="text">Nothing is found</p> : <PackTable />}
    </div>
  )
}

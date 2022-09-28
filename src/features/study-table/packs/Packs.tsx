import { useEffect } from 'react'

import { Navigate } from 'react-router-dom'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { useDebounce } from '../../../common/hooks/useDebounce'
import { Paths } from '../../../common/routes'

import { setPacksTC } from './packs-reducer'
import { PackSettings } from './PackSettings/PackSettings'
import { PackTable } from './PackTable/PackTable'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const min = useAppSelector(state => state.packs.min)
  const max = useAppSelector(state => state.packs.max)
  const debounceMin = useDebounce<number>(min, 500)
  const debounceMax = useDebounce<number>(max, 500)

  useEffect(() => {
    dispatch(setPacksTC())
  }, [debounceMin, debounceMax])

  if (!isLoggedIn) {
    return <Navigate to={Paths.SingIn} />
  }

  return (
    <div>
      <PackSettings />
      <PackTable />
    </div>
  )
}

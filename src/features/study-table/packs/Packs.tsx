import { useEffect } from 'react'

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Navigate, useNavigate } from 'react-router-dom'

import { Button } from '../../../common/components/Button/Button'
import { InputText } from '../../../common/components/InputText/InputText'
import { SearchBar } from '../../../common/components/SearchBar/SearchBar'
import { SearchInput } from '../../../common/components/SearchInput/SearchInput'
import { RangeSlider } from '../../../common/components/Slider/Slider'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { Paths } from '../../../common/routes'
import { setCardsTC } from '../cards/cards-reducer'

import { setPacksTC } from './packs-reducer'
import style from './packs.module.css'

export const Packs = () => {
  const packs = useAppSelector(state => state.packs.packs)
  const userId = useAppSelector(state => state.auth.profile?._id)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const showMyPacks = () => {
    dispatch(setPacksTC({ user_id: userId! }))
  }

  const showAllPacks = () => {
    dispatch(setPacksTC({ user_id: null }))
  }

  useEffect(() => {
    dispatch(setPacksTC({ user_id: null }))
  }, [])

  const searchPack = (text: string) => {
    dispatch(
      setPacksTC({
        user_id: userId!,
        packName: text,
      })
    )
  }

  if (!isLoggedIn) {
    return <Navigate to={Paths.SingIn} />
  }

  return (
    <div>
      <div className={style.packList}>
        <h2>Pack list</h2>
        <Button>Add new pack</Button>
      </div>
      <div className={style.settings}>
        <div>
          <SearchBar search={searchPack} />
        </div>

        <div>
          <h4>Show packs cards</h4>
          <Button onClick={showMyPacks}>My</Button>
          <Button onClick={showAllPacks}>All</Button>
        </div>

        <div>
          <h4>Number of cards</h4>
          <RangeSlider />
        </div>

        <Button>Filter</Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Cards</TableCell>
              <TableCell align="right">Last Updated</TableCell>
              <TableCell align="right">Created by</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packs.map(pack => {
              const getPackId = () => {
                navigate(`/cards/${pack._id}`)
              }

              return (
                <TableRow onClick={getPackId} key={pack._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {pack.name}
                  </TableCell>
                  <TableCell align="right">{pack.cardsCount}</TableCell>
                  <TableCell align="right">{pack.updated.slice(0, 10)}</TableCell>
                  <TableCell align="right">{pack.user_name}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

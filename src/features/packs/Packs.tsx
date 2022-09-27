import { useEffect } from 'react'

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../common/components/Button/Button'
import { InputText } from '../../common/components/InputText/InputText'
import { RangeSlider } from '../../common/components/Slider/Slider'
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks'

import { setPacksTC } from './packs-reducer'
import style from './packs.module.css'

export const Packs = () => {
  const packs = useAppSelector(state => state.pack.cardsPack)
  const userId = useAppSelector(state => state.auth.profile?._id)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const showMyPacks = () => {
    dispatch(setPacksTC('6324a109005cc31ff0356f6d'))
  }

  const showAllPacks = () => {
    dispatch(setPacksTC(null))
  }

  useEffect(() => {
    dispatch(setPacksTC(null))
  }, [])

  return (
    <div>
      <div className={style.packList}>
        <h2>Pack list</h2>
        <Button>Add new pack</Button>
      </div>
      <div className={style.settings}>
        <div>
          <h4>Search</h4>
          <InputText placeholder={'Provide your text'} />
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
                <TableRow
                  onClick={getPackId}
                  key={pack.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
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

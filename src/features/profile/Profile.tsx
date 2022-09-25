import { useEffect } from 'react'

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import dragonImg from '../../assets/images/dragon.png'
import { Button } from '../../common/components/Button/Button'
import { EditableSpan } from '../../common/components/EditableSpan/EditableSpan'
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks'
import { logoutTC, updateProfileTC } from '../auth/auth-reducer'
import authStyle from '../auth/auth.module.css'
import { SignIn } from '../auth/sign-in/SignIn'
import { setPacksTC } from '../packs/packs-reducer'

import style from './Profile.module.css'

export const Profile = () => {
  const packs = useAppSelector(state => state.pack.cardsPack)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const profile = useAppSelector(state => state.auth.profile)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setPacksTC())
  }, [])

  if (!isLoggedIn) {
    return <SignIn />
  }

  const changeName = (name: string) => {
    dispatch(updateProfileTC({ name }))
  }

  const logout = () => {
    dispatch(logoutTC())
  }

  return (
    <div>
      <div className={`${style.box} ${authStyle.container}`}>
        <h1 className="section-title">Personal information</h1>
        <div className={style['profile-data']}>
          <div className={style.photo}>
            <img src={dragonImg} alt="user photo" />
          </div>
          <EditableSpan text={profile?.name || 'anonymous'} changeText={changeName} />
        </div>
        <Button onClick={logout}>Log out</Button>
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
            {packs.map(pack => (
              <TableRow key={pack.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {pack.name}
                </TableCell>
                <TableCell align="right">{pack.cardsCount}</TableCell>
                <TableCell align="right">{pack.updated.slice(0, 10)}</TableCell>
                <TableCell align="right">{pack.user_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

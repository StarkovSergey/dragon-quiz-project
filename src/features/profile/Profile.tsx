import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IconButton } from '@mui/material'
import { NavLink } from 'react-router-dom'

import dragonImg from '../../assets/images/dragon.png'
import { BackLink } from '../../common/components/BackLink/BackLink'
import { Button } from '../../common/components/Button/Button'
import { EditableSpan } from '../../common/components/EditableSpan/EditableSpan'
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks'
import { Paths } from '../../common/routes'
import { logoutTC, updateProfileTC } from '../auth/auth-reducer'
import authStyle from '../auth/auth.module.css'
import { SignIn } from '../auth/sign-in/SignIn'

import style from './Profile.module.css'

export const Profile = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const profile = useAppSelector(state => state.auth.profile)
  const dispatch = useAppDispatch()

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
      <BackLink linkText="Back to Packs List" to="/" />
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
    </div>
  )
}

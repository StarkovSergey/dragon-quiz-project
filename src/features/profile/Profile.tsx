import { ChangeEvent } from 'react'

import { setAppError } from '../../app/app-slice'
import dragonImg from '../../assets/images/dragon.png'
import { BackLink } from '../../common/components/BackLink/BackLink'
import { Button } from '../../common/components/Button/Button'
import { EditableSpan } from '../../common/components/EditableSpan/EditableSpan'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { uploadFileHandler } from '../../common/utils/uploadFileHandler'
import { logoutTC, updateProfileTC } from '../auth/auth-slice'
import authStyle from '../auth/auth.module.css'

import style from './Profile.module.css'

export const Profile = () => {
  const profile = useAppSelector(state => state.auth.profile)
  const dispatch = useAppDispatch()
  const avatar = useAppSelector(state => state.auth.profile?.avatar)

  const changeName = (name: string) => {
    dispatch(updateProfileTC({ name }))
  }

  const logout = () => {
    dispatch(logoutTC())
  }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    uploadFileHandler(
      e,
      (file64: string) => {
        dispatch(updateProfileTC({ avatar: file64 }))
      },
      dispatch
    )
  }

  const errorHandler = () => {
    dispatch(setAppError({ error: 'Avatar is broken. Please, upload new photo' }))
  }

  return (
    <div>
      <BackLink linkText="Back to Packs List" to="/" />
      <div className={`${style.box} ${authStyle.container}`}>
        <h1 className="section-title">Personal information</h1>
        <div className={style['profile-data']}>
          <label className={style.photo}>
            <img src={avatar || dragonImg} alt="user photo" onError={errorHandler} />
            <input onChange={uploadHandler} className={style['photo-input']} type="file" />
          </label>
          <EditableSpan text={profile?.name || 'anonymous'} changeText={changeName} />
        </div>
        <Button onClick={logout}>Log out</Button>
      </div>
    </div>
  )
}

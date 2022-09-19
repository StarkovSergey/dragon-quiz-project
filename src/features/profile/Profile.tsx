import { useAppSelector } from '../../app/store'
import dragonImg from '../../assets/images/dragon.png'
import { EditableSpan } from '../../common/components/EditableSpan/EditableSpan'
import { updateProfileTC } from '../auth/auth-reducer'
import { SignIn } from '../auth/sign-in/SignIn'

import style from './Profile.module.css'

export const Profile = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const profile = useAppSelector(state => state.auth.profile)

  if (!isLoggedIn) {
    return <SignIn />
  }

  const changeName = (name: string) => {
    updateProfileTC({ name })
  }

  return (
    <div>
      <h1>Personal information</h1>
      <div className={style.photo}>
        <img src={dragonImg} alt="user photo" />
      </div>

      <EditableSpan text={profile.name} changeText={changeName} />
    </div>
  )
}

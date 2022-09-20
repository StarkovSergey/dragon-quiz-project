import { useAppSelector } from '../../../app/store'
import dragonImg from '../../../assets/images/dragon.png'

import style from './ProfileLink.module.css'

export const ProfileLink = () => {
  const profile = useAppSelector(state => state.auth.profile)

  return (
    <div className={style.box}>
      <span className={style.name}>{profile?.name}</span>
      <img src={dragonImg} alt="user avatar" width="50" height="50" />
    </div>
  )
}

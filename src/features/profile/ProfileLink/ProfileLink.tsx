import dragonImg from '../../../assets/images/dragon.png'
import { useAppSelector } from '../../../common/hooks/useAppSelector'

import style from './ProfileLink.module.css'

export const ProfileLink = () => {
  const profile = useAppSelector(state => state.auth.profile)
  const avatar = useAppSelector(state => state.auth.profile?.avatar)

  return (
    <div className={style.box}>
      <span className={style.name}>{profile?.name}</span>
      <div className={style['small-avatar']}>
        <img src={avatar || dragonImg} alt="user avatar" width="50" height="50" />
      </div>
    </div>
  )
}

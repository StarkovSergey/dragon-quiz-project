import { NavLink, useNavigate } from 'react-router-dom'

import whiteTree from '../../assets/images/white-tree.png'
import { Button } from '../../common/components/Button/Button'
import { ProfileLink } from '../../features/profile/ProfileLink/ProfileLink'
import { useAppSelector } from '../store'

import style from './Header.module.css'

export const Header = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const navigate = useNavigate()

  const navigateToSignIn = () => {
    navigate('sign-in')
  }

  return (
    <header>
      <nav className={style.nav}>
        <div className={style.logo}>
          <NavLink to="/">
            <img width="70" height="70" src={whiteTree} alt="logo" />
          </NavLink>
        </div>

        <ul className={style['nav-list']}>
          {isLoggedIn ? (
            <li>
              <NavLink to="profile">
                <ProfileLink />
              </NavLink>
            </li>
          ) : (
            <Button onClick={navigateToSignIn} art>
              Sign in
            </Button>
          )}
        </ul>
      </nav>
    </header>
  )
}

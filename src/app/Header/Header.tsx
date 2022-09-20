import { NavLink } from 'react-router-dom'

import whiteTree from '../../assets/images/white-tree.png'
import { ProfileLink } from '../../features/profile/ProfileLink/ProfileLink'
import { useAppSelector } from '../store'

import style from './Header.module.css'

export const Header = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  return (
    <header>
      <nav className={style.nav}>
        <div className={style.logo}>
          <NavLink to="/">
            <img width="70" height="70" src={whiteTree} alt="logo" />
          </NavLink>
        </div>

        <ul className={style['nav-list']}>
          <li>
            <NavLink to="new-password">New password</NavLink>
          </li>
          <li>
            <NavLink to="check-email">Check email</NavLink>
          </li>
          {isLoggedIn ? (
            <li>
              <NavLink to="profile">
                <ProfileLink />
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink to="sing-in">Sign in</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

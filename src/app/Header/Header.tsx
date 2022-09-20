import { NavLink } from 'react-router-dom'

import whiteTree from '../../assets/images/white-tree.png'

import style from './Header.module.css'

export const Header = () => {
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
            <NavLink to="test">Test page</NavLink>
          </li>
          <li>
            <NavLink to="sing-in">Sign in</NavLink>
          </li>
          <li>
            <NavLink to="sign-up">Sign up</NavLink>
          </li>
          <li>
            <NavLink to="forgot-password">Forgot password</NavLink>
          </li>
          <li>
            <NavLink to="new-password">New password</NavLink>
          </li>
          <li>
            <NavLink to="check-email">Check email</NavLink>
          </li>
          <li>
            <NavLink to="profile">Profile</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

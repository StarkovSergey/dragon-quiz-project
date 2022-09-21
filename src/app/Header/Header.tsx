import { LinearProgress } from '@mui/material'
import { NavLink, useNavigate, useParams } from 'react-router-dom'

import logo from '../../assets/images/logo--dark-theme.svg'
import mobileLogo from '../../assets/images/logo-mobile--dark-theme.svg'
import { Button } from '../../common/components/Button/Button'
import { ProfileLink } from '../../features/profile/ProfileLink/ProfileLink'
import { useAppSelector } from '../store'

import style from './Header.module.css'

export const Header = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const navigate = useNavigate()
  const status = useAppSelector(state => state.app.status)

  const navigateToSignIn = () => {
    navigate('sign-in')
  }

  return (
    <header className={style.header}>
      <div className="container">
        <nav className={style.nav}>
          <div className={style.logo}>
            <NavLink to="/">
              <picture>
                <source media="(max-width: 500px)" srcSet={mobileLogo} />
                <img width="200" src={logo} alt="logo" />
              </picture>
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
      </div>
      {status === 'loading' && (
        <LinearProgress
          sx={{
            position: 'absolute',
            width: '100%',
            top: 0,
          }}
          color={'warning'}
        />
      )}
    </header>
  )
}

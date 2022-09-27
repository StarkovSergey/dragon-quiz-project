import React from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { NavLink } from 'react-router-dom'

import style from './BackLink.module.css'

type PropsType = {
  to: string
  linkText: string
}

export const BackLink = ({ linkText, to }: PropsType) => {
  return (
    <NavLink className={style['back-link']} to={to}>
      <ArrowBackIcon />
      {linkText}
    </NavLink>
  )
}

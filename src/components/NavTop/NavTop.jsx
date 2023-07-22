import React from 'react'
import s from'./style.module.css'

import { useSelector } from 'react-redux'

export default function NavTop() {
  const currentUser = useSelector(({user}) => user.currentUser.userName)

  return (
    <div className={s.nav}>
        <h2>{currentUser}</h2>
    </div>
  )
}

import React from 'react'
import s from'./style.module.css'

import { useSelector } from 'react-redux'

export default function NavTop() {
  const currentUser = useSelector(({user}) => user.currentUser)

  return (
    <div className={s.nav}>
        <h2>{currentUser.userName} {currentUser.userId}</h2>
    </div>
  )
}

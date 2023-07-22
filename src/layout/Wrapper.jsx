import React from 'react'
import s from './style.module.css'

export default function Wrapper({children}) {
  return (
    <div className={s.container}>
        {children}
    </div>
  )
}

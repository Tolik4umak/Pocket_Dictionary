import { Button } from '@mui/material'
import React from 'react'
import s from './style.module.css'

export default function Modal({children, isActive, setIsActive}) {

  return (
    <div 
        className={[s.container, !isActive ? s.unactive: ''].join(' ')}
        onClick={() => setIsActive(false)}
    >
        <div 
            className={s.modal}
            onClick={(e) => e.stopPropagation()}
        >
            <div className={s.content}>{children && children}</div>
            <Button variant='contained' className={s.button} onClick={() => setIsActive(false)}>OK</Button>
        </div>
    </div>
  )
}

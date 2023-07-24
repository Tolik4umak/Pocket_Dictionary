import { TextField } from '@mui/material'
import React from 'react'
import s from './style.module.css'

export default function Search({handleList}) {

  const handleChange = (e) => {
    e.preventDefault()
    handleList(e.target.value)
  }  

  return (
    <div className={s.inputbox}>
        <TextField
            className={s.input}
            label = 'search '
            name='search'
            onChange={handleChange}            
        />
    </div>
  )
}

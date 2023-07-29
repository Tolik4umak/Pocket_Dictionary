import React from 'react'
import { Link } from 'react-router-dom'
import s from './style.module.css'
import { Button } from '@mui/material'
import Wrapper from '../../layout/Wrapper'

export default function ExercisesPage() {
  
  return (
    <Wrapper>

      <div className={s.container}>

        <Link to='/Pocket_Dictionary/exercises/origin'>
          <Button variant="outlined" size="large" sx={{p: 5, width: '100%'}}>
              translation - word
          </Button>
        </Link>
      
        <Link to='/Pocket_Dictionary/exercises/translation'>
          <Button variant="outlined" size="large"sx={{p: 5, width: '100%'}}>
              word - translation
          </Button>
        </Link>

        <Link to='/exercises'>
          <Button variant="outlined" size="large"  sx={{p: 5, width: '100%'}} disabled>
              match the pairs
          </Button>
        </Link>

      </div>

    </Wrapper>
  )
}

import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import Wrapper from '../../layout/Wrapper'
import s from './style.module.css'
import { editCard } from '../../store/userSlice'

export default function ExersiseSinglePage() {

  const list = useSelector(({user}) => user.list)
  const [tempExercise, setTempExercise] = useState('')
  const [answerMode, setAnswerMode] = useState(true)
  const {type} = useParams()

  const dispatch = useDispatch()

  

  useEffect(() => {
    if(list.length > 4) randomWord()
  },[])

  const randomWord = () => {
    const curList = list.slice()
          .sort((a,b) => Math.random() - 0.5 + (a.progress - b.progress)/200)
          .slice(0,5)
          .map(card => ({...card, status: ''}))
    const randomIndex = Math.round(Math.random() * 4)
    const targetWord = curList[randomIndex]

    const tempEx = {
      curList,
      targetWord
    }

    setTempExercise(tempEx)
    setAnswerMode(true)

  }

  const checkAnswer = (card , e) => {
    const answer = card.id === tempExercise.targetWord.id
    const target = list.slice().find(({id}) => id === tempExercise.targetWord.id)

    if(answer){
      card.status = true
      if( target.progress < 20 ) dispatch(editCard({...target, progress: target.progress + 1}))
    }else{
      card.status = false
      tempExercise.curList.find(({id}) => id === tempExercise.targetWord.id ).status = true
      if( target.progress > 0 ) dispatch(editCard({...target, progress: target.progress - 1}))
    }
    setTempExercise({...tempExercise})
    setAnswerMode(false)
  }


  return (
    <Wrapper>
      {
        tempExercise ? (
        <div className={s.container}>

          <Typography variant="h5" component="h2" >
            {type === 'origin' ? tempExercise.targetWord.origin: tempExercise.targetWord.translation}
          </Typography>

          <div className={s.list}>
            {
              tempExercise.curList.map((card) => {
                return (
                  <Button
                    key={card.id}
                    variant={ card.status ? 'contained' : card.status === false ? 'contained': 'outlined'}
                     sx={{p: 1}}
                    color={card.status ? 'success' : card.status === false ? 'error': 'primary'}
                    onClick={answerMode ? (e) => checkAnswer(card, e) : randomWord}
                    >
                        {type === 'origin' ? card.translation : card.origin}
                  </Button>
                )
              })
            }
          </div>

          <Button
            variant='contained'
            onClick={randomWord}
            sx={{p: 2}}
          >
            Next
          </Button>

        </div>
        ) : (
          <div className={s.container}>
            <Typography variant="h5" component="h2" color={'secondary.light'} >
              In order to this exercise be available need to have minimum 5 cards in your dictionary
              <br />
              <br />
              Current cards : {list.length}
            </Typography>
          </div>
        )
      }
    </Wrapper>

  )
}

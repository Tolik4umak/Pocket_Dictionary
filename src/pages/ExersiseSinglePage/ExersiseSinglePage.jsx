import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import Wrapper from '../../layout/Wrapper'
import s from './style.module.css'
import { editCard, refreshUserScore } from '../../store/userSlice'

export default function ExersiseSinglePage() {

  const list = useSelector(({user}) => user.list.filter(card => card.progress < 20))
  const [tempExercise, setTempExercise] = useState('')
  const [answerMode, setAnswerMode] = useState(true)
  const {type} = useParams()
  const dispatch = useDispatch()
  const buffer = useRef(new Array(10))
  const score = useRef({wrong: 0, correct: 0})
  

  useEffect(() => {
    if(list.length > 10) randomWord()
  },[])

  useEffect(() => {

    return () =>  {
      if(score.current.correct || score.current.wrong) dispatch(refreshUserScore(score.current))
    }
  },[])

  const randomWord = () => {

    const tempEx = {
      curList: [],
      targetWord: {}
    }

    while(buffer.current.some(e => e.id === tempEx.targetWord?.id) || tempEx.curList.length === 0){
      const randomIndex = Math.round(Math.random() * 4)
      const curList = list.slice()
      .sort((a,b) => Math.random() - 0.5 + (a.progress - b.progress)/200)
      .slice(0,5)
      .map(card => ({...card, status: ''}))
      const targetWord = curList[randomIndex]

      tempEx.curList = [...curList]
      tempEx.targetWord = {...targetWord}
    }
   
    buffer.current.unshift(tempEx.targetWord)
    buffer.current.pop()

    if(list.length < 11){
      setTempExercise('')
    }else{
      setTempExercise(tempEx)
      setAnswerMode(true)
    }

  }

  const checkAnswer = (card , e) => {
    const answer = card.id === tempExercise.targetWord.id
    const target = list.slice().find(({id}) => id === tempExercise.targetWord.id)

    if(answer){
      card.status = true
      if( target.progress < 20 ) dispatch(editCard({...target, progress: target.progress + 10}))
      score.current.correct += 1  
    }else{
      card.status = false
      tempExercise.curList.find(({id}) => id === tempExercise.targetWord.id ).status = true
      if( target.progress > 0 ) dispatch(editCard({...target, progress: target.progress - 1}))
      score.current.wrong += 1   
    }
    setTempExercise({...tempExercise})
    setAnswerMode(false)
  }


  return (
    <Wrapper>
      {
        tempExercise ? (
        <div className={s.container}>


          <Typography className={s.score} variant="h6" component="p" >
            Score 
            <span className={s.score_correct}> {score.current.correct}</span> /
            <span className={s.score_wrong}> {score.current.wrong}</span>
          </Typography>

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
            onClick={ !answerMode ? randomWord : undefined}
            disabled = {answerMode}
            sx={{p: 2}}
          >
            Next
          </Button>

        </div>
        ) : (
          <div className={s.container}>

            <Typography className={s.score} variant="h6" component="p" >
              Score 
              <span className={s.score_correct}> {score.current.correct}</span> /
              <span className={s.score_wrong}> {score.current.wrong}</span>
            </Typography>
            
            <Typography variant="h5" component="h2" color={'secondary.light'} >
              In order to this exercise be available need to have more then 10 (not learned) cards in your dictionary
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

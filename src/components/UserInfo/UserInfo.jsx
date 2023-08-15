import React from 'react'
import Wrapper from '../../layout/Wrapper'
import { useSelector } from 'react-redux'

export default function UserInfo() {
  const {list, currentUser } = useSelector(state => state.user)
  const {correct , wrong} = currentUser.userScore ?? {correct: 0, wrong: 0}
  
  let learnedWards = 0
  let studyWards = 0
  let unlearnedWards = 0

  list.map(({progress}) => {
    if(progress >= 20){
      learnedWards++
    }else if(progress > 0){
      studyWards++
    }else{
      unlearnedWards++
    }
  })


  return (
    <Wrapper>
        <p>Total words { list.length }</p>
        <p>Number of words learned { learnedWards }</p>
        <p>Number of words in study { studyWards }</p>
        <p>Number of unlearned words { unlearnedWards }</p>
        <p>Best Score { correct + ' / ' +  wrong }</p> 
    </Wrapper>
  )
}

import React from 'react'
import { useSelector } from 'react-redux'
import SingleCard from '../SingleCard/SingleCard'
import s from './style.module.css'

export default function CardsList() {

  const cardsList = useSelector(state => state.user.list)  

  return (
    <div className={s.cardlist}>
        {
            cardsList.map(card => <SingleCard key={card.id} {...card}/>)
        }
    </div>
  )
}

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NewCardForm from '../../components/NewCardForm/NewCardForm'
import { Navigate } from 'react-router-dom'
import { addNewCard } from '../../store/userSlice'

export default function FormPage() {
    
  const currentUser = useSelector(state => state.user.currentUser)  
  const dispatch = useDispatch()

  const addCard = (value, {resetForm}) => {
    const card = {...value, id: Date.now(), userId:  currentUser.userId}
    dispatch(addNewCard(card))
    resetForm()
  }
  
  return (
    <>
    {
      currentUser
      ?(
        <NewCardForm userId={currentUser.userId} handleForm={addCard}/>
      )
      :(<Navigate to={'/Pocket_Dictionary'}/>) 
    }
    </>
    
  )
}

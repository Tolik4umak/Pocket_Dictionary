import React from 'react'
import { useSelector } from 'react-redux'
import NewCardForm from '../../components/NewCardForm/NewCardForm'
import { Navigate } from 'react-router-dom'

export default function FormPage() {
    
  const currentUser = useSelector(state => state.user.currentUser)  
  
  return (
    <>
    {
      currentUser
      ?(
        <NewCardForm/>
      )
      :(<Navigate to={'/Pocket_Dictionary'}/>) 
    }
    </>
    
  )
}

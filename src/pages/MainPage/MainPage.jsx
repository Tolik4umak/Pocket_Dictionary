import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { removeUser } from '../../store/userSlice'
import CardsList from '../../components/CardsList/CardsList'
import Wrapper from '../../layout/Wrapper'

export default function MainPage() {

  const currentUser = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(removeUser())
  }

  return (
    <>
    {
      currentUser
      ?(
        <Wrapper>
          <CardsList/>
        </Wrapper>
       
      )
      :(<Navigate to={'/'}/>)
    }

    </>
    
  )
}

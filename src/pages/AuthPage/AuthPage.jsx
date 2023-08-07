
import React, { useState } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Wrapper from '../../layout/Wrapper'

export default function AuthPage() {

  const currentUser = useSelector(state => state.user.currentUser)  
  const [authMode, setAuthMode] = useState('login')
  console.log(currentUser);

  return (
    <>
       { !currentUser
       ? (
        <Wrapper>
            { authMode === 'login' &&  <LoginForm setAuthMode={setAuthMode}/>}
            { authMode === 'register' &&  <RegisterForm setAuthMode={setAuthMode}/>}
        </Wrapper> 
       )
       :(<Navigate to={'/Pocket_Dictionary/main'}/>) 
          
        }
    </>
  )
}












// const storExample = {
//     users:[
//         {
//             userId: 1,
//             userName: 'User1'
//         },
//         {}
//     ],
//     dicrionary: [
//         {
//             userId: 1,
//             origin: 'Hello',
//             translation: 'Привет'
//         }
//     ]

//   }

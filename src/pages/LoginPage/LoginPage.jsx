
import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function LoginPage() {

  const currentUser = useSelector(state => state.user.currentUser)  
  console.log(currentUser);


  return (
    <>
       { !currentUser
       ? (
        <div>
            <LoginForm/>
            <br />
            <RegisterForm/>
        </div> 
       )
       :(<Navigate to={'/main'}/>) 
        
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

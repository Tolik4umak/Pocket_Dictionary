import { Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { addNewCard, removeUser } from '../../store/userSlice'

export default function MainPage() {

  const currentUser = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(removeUser())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let formData = new FormData(e.target);
    let data = {...Object.fromEntries(formData), userId: currentUser.userId, id: Date.now()}
    // const curStorage = JSON.parse(localStorage.getItem('PocketDictionary'))
    // let newStorage = {}
    // if(!curStorage.dictionary || curStorage?.dictionary === []){
    //   newStorage = JSON.stringify({...curStorage, dictionary: [data]})
    // }else{
    //   newStorage = JSON.stringify({...curStorage, dictionary: [...curStorage.dictionary, data]})
    // }
    // localStorage.setItem('PocketDictionary', newStorage)
    dispatch(addNewCard(data))
  }

  return (
    <>
    {
      currentUser
      ?(
        <div>
          <h1> Welcome {currentUser.userName}</h1>

          <form onSubmit={handleSubmit}>
            <input type="text" name='origin'/>
            <input type="text" name='translation'/>
            <button>add</button>
          </form>
          <br />

        </div>
       
      )
      :(<Navigate to={'/'}/>)
    }
    <Button onClick={logout} variant="contained">logout</Button>
    </>
    
  )
}

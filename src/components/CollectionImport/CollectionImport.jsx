import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addNewList } from '../../store/userSlice'

export default function CollectionImport() {

  const list = useSelector(({user}) => user.list)
  const userId = useSelector(({user}) => user.currentUser.userId)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const past = (e) => {
    e.preventDefault()
    const list = JSON.parse(e.target.list.value)
    const userList = list.map((card) => ({...card, progress: 0, userId}))
    dispatch(addNewList(userList))
    navigate('/Pocket_Dictionary')
   }  


  return (
    <div>
        <form onSubmit={past}>
            <textarea name="list"></textarea>
            <button type='submit'>paste</button>
        </form>
    </div>
  )
}

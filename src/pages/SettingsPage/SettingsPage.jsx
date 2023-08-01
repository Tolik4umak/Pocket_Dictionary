import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import storage from '../../services'
import { addNewList } from '../../store/userSlice'
import { useNavigate } from 'react-router-dom'

export default function SettingsPage() {

  const list = useSelector(({user}) => user.list)
  const userId = useSelector(({user}) => user.currentUser.userId)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const copy = () => {
    navigator.clipboard.writeText(JSON.stringify(list))
  }

  const past = (e) => {
    e.preventDefault()
    const list = JSON.parse(e.target.list.value)
    const userList = list.map((card) => ({...card, userId}))
    dispatch(addNewList(userList))
    navigate('/Pocket_Dictionary')
  }

  return (
    <div>
      <button onClick={copy}>Share</button>
      <form onSubmit={past}>
        <textarea name="list"></textarea>
        <button type='submit'>paste</button>
      </form>

    </div>
  )
}


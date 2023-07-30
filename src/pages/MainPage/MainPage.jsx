import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { removeUser } from '../../store/userSlice'
import CardsList from '../../components/CardsList/CardsList'
import Wrapper from '../../layout/Wrapper'
import Search from '../../components/Search/Search'
import CardsCollections from '../../components/CardsCollections/CardsCollections'

export default function MainPage() {

  const currentUser = useSelector(state => state.user.currentUser)
  const currentList = useSelector(state => state.user.list)
  const [filteredList, setFilteredList] = useState(currentList.slice().reverse())

  useEffect(() => {
    setFilteredList(currentList.slice().reverse())
  },[currentList])

  const handleList = (val) => {
    const newList = currentList.filter(({origin, translation})=> {
      return origin.toLowerCase().startsWith(val.toLowerCase()) || translation.toLowerCase().startsWith(val.toLowerCase())
    })
    setFilteredList(newList)
  }

  return (
    <>
    {
      currentUser
      ?(
        <Wrapper>
          <Search handleList={handleList} />
          {
            currentList.length 
            ? (<CardsList list={filteredList}/>) 
            : (<CardsCollections/>)
          }
        </Wrapper>
       
      )
      :(<Navigate to={'/Pocket_Dictionary'}/>)
    }

    </>
    
  )
}

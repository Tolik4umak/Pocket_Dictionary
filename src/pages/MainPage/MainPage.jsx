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
  const [filteredList, setFilteredList] = useState(currentList.slice())

  useEffect(() => {
    setFilteredList(currentList.slice())
  },[currentList])

  const handleList = (val) => {
    const newList = currentList.filter(({origin, translation})=> {
      const originArr = origin.split(' ')
      const translationArr = translation.split(' ')
      const originSerch = originArr.some(item => item.toLowerCase().startsWith(val.toLowerCase())) 
      const translationSerch = translationArr.some(item => item.toLowerCase().startsWith(val.toLowerCase())) 

      return originSerch || translationSerch
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
            : (<CardsCollections currentUser={currentUser}/>)
          }
        </Wrapper>
       
      )
      :(<Navigate to={'/Pocket_Dictionary'}/>)
    }

    </>
    
  )
}

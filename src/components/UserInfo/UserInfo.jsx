import React from 'react'
import Wrapper from '../../layout/Wrapper'
import { useSelector } from 'react-redux'

export default function UserInfo() {
  const list = useSelector(state => state.user.list)
    
  return (
    <Wrapper>
        Total words { list.length }
    </Wrapper>
  )
}

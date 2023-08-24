import React from 'react'
import s from'./style.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { removeUser } from '../../store/userSlice'
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ViewListIcon from '@mui/icons-material/ViewList';
import LogoutIcon from '@mui/icons-material/Logout';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export default function NavBottom() {
  const dispatch = useDispatch()
  const navigate = useNavigate()  
  const logout = () => {
    navigate('/')
    setTimeout(() => dispatch(removeUser()), 1000)
    
  }  

  const isActive = ({isActive}) => isActive ? s.active: '' 
  return (
    <div className={s.nav}>
        <NavLink className={isActive} to={'/Pocket_Dictionary/settings'}> <ManageAccountsIcon/></NavLink>
        <NavLink className={isActive} to={'/Pocket_Dictionary/form'}> <NoteAddIcon/></NavLink>
        <NavLink className={isActive} to={'/Pocket_Dictionary/main'}><ViewListIcon/></NavLink>
        <NavLink className={isActive} to={'/Pocket_Dictionary/exercises'}> <FitnessCenterIcon/></NavLink>
        <LogoutIcon onClick={logout}/>
    </div>
  )
}

import React from 'react'
import s from'./style.module.css'
import { NavLink } from 'react-router-dom'
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
  const logout = () => dispatch(removeUser())  

  const isActive = ({isActive}) => isActive ? s.active: '' 
  return (
    <div className={s.nav}>
        <NavLink className={isActive} to={'/settings'}> <ManageAccountsIcon/></NavLink>
        <NavLink className={isActive} to={'/form'}> <NoteAddIcon/></NavLink>
        <NavLink className={isActive} to={'/main'}><ViewListIcon/></NavLink>
        <NavLink className={isActive} to={'/exercises'}> <FitnessCenterIcon/></NavLink>
        <LogoutIcon onClick={logout}/>
    </div>
  )
}

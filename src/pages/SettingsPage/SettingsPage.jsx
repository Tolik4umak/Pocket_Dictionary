import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import s from './style.module.css'
import Wrapper from '../../layout/Wrapper'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useDispatch, useSelector } from 'react-redux'
import { addNewList } from '../../store/userSlice'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import QueueOutlinedIcon from '@mui/icons-material/QueueOutlined';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';




export default function SettingsPage() {

  const list = useSelector(({user}) => user.list)
  const userId = useSelector(({user}) => user.currentUser.userId)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const dictionaryImport = () => {   
 
    navigator.clipboard.readText()
    .then(text => {
      const localList = JSON.parse(text).filter((card) => {
        const isContain = list.some(el => el.id === card.id)
        return !isContain
      })
      
      if(localList.length){
        const userList = localList.map((card) => ({...card, progress: 0, userId}))
        dispatch(addNewList(userList))
        toast.success(`${localList.length} of ${localList.length} cards had been added to dictionary`,{
          icon:  <CheckCircleIcon sx={{color: '#2e7d32'}}/>,
          progressClassName: s.progress_success,
        });
        setTimeout(() =>  navigate('/Pocket_Dictionary'), 3000)
      }else{
        toast.error('This collection already exist in your dictionary',{
          icon:  <ReportProblemIcon sx={{color: '#d32f2f'}}/>,
          progressClassName: s.progress_error,
        });
      }
 
    })
    .catch(err => {
        console.log('Something went wrong', err);
    });
  } 
  
  const copy = () => {
    navigator.clipboard.writeText(JSON.stringify(list))
    .then(() => {
      toast.success('Cards copied to clipboard',{
        icon:  <CheckCircleIcon sx={{color: '#2e7d32'}}/>,
        progressClassName: s.progress_success,
      });
    })
    .catch(err => {
        toast.error('Error in copying text: ', err);
    });
  }




  return (
    <Wrapper>

      <ul className={s.list}> 
        <li className={s.list_item}>
          <PermIdentityIcon className={s.icon} />
          <Link to='/Pocket_Dictionary/setting/userinfo'>User info</Link>
        </li>
        <li className={s.list_item}>
          <QueueOutlinedIcon className={s.icon} />
          <Link>Set Collections</Link>
        </li>
        <li className={s.list_item}>
          <Button onClick={copy} variant="outlined" startIcon={<ContentCopyIcon />}>
            Copy Dictionary
          </Button>
        </li>
        <li>
          <Button onClick={dictionaryImport} variant="outlined" startIcon={<FileDownloadOutlinedIcon />}>
            Import Dictionary from clipboard
          </Button>
        </li>
     
      </ul>

    </Wrapper>
  )
}


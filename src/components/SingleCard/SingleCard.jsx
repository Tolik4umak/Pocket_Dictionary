import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editCard, removeCard } from '../../store/userSlice'
import Modal from '../Modal/Modal'
import EditIcon from '@mui/icons-material/Edit';
import NewCardForm from '../NewCardForm/NewCardForm'


export default function SingleCard(curCard) {

  const {id, userId, origin, translation, description, picture, progress} = curCard 

  const [isActive, setIsActive] = useState(false)  
  const [isEdit, setIsEdit] = useState(false)  
  const dispatch = useDispatch()  

  const handleRemove = () => {
    dispatch(removeCard(curCard))
  }  

  const handleModal = () => {
    setIsActive(true)
  }

  const handleEdit = () => {
    setIsEdit(true)
  }

  const editCurCard = (value) => {
    const card = {...value, id, userId, progress}
    dispatch(editCard(card))
    setIsEdit(false)
  }

  const handleReset = () => {
    dispatch(editCard({...curCard, progress: 0}))
  }


  return (
   <>
        <Card sx={{maxWidth: 345, boxShadow: 5, width: '100%', display: "flex", flexDirection: 'column'}}>

            <CardActionArea>
                {
                    picture && (
                        <img 
                            style={{objectFit: 'contain', width: "100%", maxHeight: '340px', background: '#000'}} 
                            src={picture} 
                            alt={origin} 
                        />
                    )
                }
                <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                        {origin}
                    </Typography>
                    <Typography variant='h6' color='text.secondary'>
                        {translation}
                    </Typography>
                </CardContent>
            </CardActionArea>
            
            <CardActions style={{display: 'flex', flex: '1 1 auto', alignItems: 'start'}}>
                <Button color='error' onClick={handleRemove}>REMOVE</Button>
                {description && <Button onClick={handleModal}>MORE</Button>}
                <Button color='success' onClick={handleReset}>reset</Button>
                <Button onClick={handleEdit} style={{display: 'flex', flex: '1 1 auto', justifyContent: 'end' }}>
                    <EditIcon fontSize='small' color='primary'/>
                </Button>
            </CardActions>

            <LinearProgress  
                variant="determinate" 
                value={progress*5} 
                color='success'
                sx={{
                    height: '5px',
                    backgroundColor: '#e1e1e1',
                }}
            />  

        </Card>


        <Modal isActive={isActive} setIsActive={setIsActive}>
            {description}
        </Modal>
        <Modal isActive={isEdit} setIsActive={setIsEdit}>
            <NewCardForm buttonName={'Edit'} {...{origin, translation, description, picture}} handleForm={editCurCard}/>
        </Modal>

   </>
  )
}

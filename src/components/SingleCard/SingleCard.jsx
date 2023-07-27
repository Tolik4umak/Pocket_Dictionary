import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editCard, removeCard } from '../../store/userSlice'
import Modal from '../Modal/Modal'
import EditIcon from '@mui/icons-material/Edit';
import NewCardForm from '../NewCardForm/NewCardForm'


export default function SingleCard({id, userId, origin, translation, description, picture}) {

  const [isActive, setIsActive] = useState(false)  
  const [isEdit, setIsEdit] = useState(false)  
  const dispatch = useDispatch()  

  const handleRemove = () => {
    dispatch(removeCard(id))
  }  

  const handleModal = () => {
    setIsActive(true)
  }

  const handleEdit = () => {
    setIsEdit(true)
  }

  const editCurCard = (value) => {
    const card = {...value, id, userId}
    dispatch(editCard(card))
    setIsEdit(false)
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
                    {/* {
                        description && (
                            <Typography variant='body2' color='text.secondary'>
                                {description}
                            </Typography>
                        )
                    } */}
                </CardContent>
            </CardActionArea>
            <CardActions style={{display: 'flex', flex: '1 1 auto', alignItems: 'end'}}>
                <Button color='error' onClick={handleRemove}>REMOVE</Button>
                {description && <Button onClick={handleModal}>MORE</Button>}
                <Button onClick={handleEdit} style={{display: 'flex', flex: '1 1 auto', justifyContent: 'end' }}>
                    <EditIcon fontSize='small' color='primary'/>
                </Button>
            </CardActions>
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

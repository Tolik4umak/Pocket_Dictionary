import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { removeCard } from '../../store/userSlice'


export default function SingleCard({id, userId, origin, translation, description, picture}) {

  const dispatch = useDispatch()  

  const handleRemove = () => {
    dispatch(removeCard(id))
  }  

  return (
    <Card sx={{maxWidth: 345, boxShadow: 5, width: '100%'}}>
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
                {
                    description && (
                        <Typography variant='body2' color='text.secondary'>
                            {description}
                        </Typography>
                    )
                }
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button onClick={handleRemove}>REMOVE</Button>
        </CardActions>
    </Card>
  )
}

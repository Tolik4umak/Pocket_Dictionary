import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { authorizeUser } from '../../store/userSlice'
import Wrapper from '../../layout/Wrapper'
import s from './style.module.css'

export default function LoginForm({setAuthMode})  {

  const dispatch = useDispatch()

  const loginSchema = yup.object({
    login: yup.string()
      .required('field is required')
      .test('nospace', 'not allowed to start with a space', (value) => {
        return !value.startsWith(' ');
      })
  })


  const formik = useFormik({
    initialValues: {
      login: ''
    },
    onSubmit: (values, {resetForm}) => {
      const storage = JSON.parse(localStorage.getItem('PocketDictionary')) ?? null
      const isUser = storage?.users.find(({userName}) => userName === values.login)
  
      if(isUser) {
        // alert('login success !!!!!!')
        dispatch(authorizeUser(isUser))
        // console.log(isUser);
      }
      else{
        alert('This user had not been registred')
      } 
  
      resetForm()
    },
    validationSchema: loginSchema

  })

  return ( 
      <div className={s.container}>
        <form className={s.form} onSubmit={formik.handleSubmit}>
            <TextField
                label = 'login'
                name='login'           
                value={formik.values.login}
                onChange={formik.handleChange}
                error={formik.touched.login && !!formik.errors.login}
                helperText = {formik.touched.login && formik.errors.login}          
            />
            <Button className={s.button} variant="contained" type='submit'>login</Button>
        </form>
        {/* <Button onClick={() => setAuthMode('register')}>register </Button> */}
        <p style={{margin: '0 auto'}}>Don't have an account ? <Button onClick={() => setAuthMode('register')}>Sing Up </Button> </p>

      </div>
  )
}
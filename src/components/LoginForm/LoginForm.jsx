import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'

export default function LoginForm()  {

  const loginSchema = yup.object({
    login: yup.string().required('field is required')
  })


  const formik = useFormik({
    initialValues: {
      login: ''
    },
    onSubmit: (values, {resetForm}) => {
      const storage = JSON.parse(localStorage.getItem('PocketDictionary')) ?? null
      const isUser = storage?.users.find(({userName}) => userName === values.login)
  
      if(isUser) alert('login success !!!!!!')
      else alert('This user had not been registred')
  
      resetForm()
    },
    validationSchema: loginSchema

  })

  return (
    <form onSubmit={formik.handleSubmit}>
        <TextField
            label = 'login'
            name='login'           
            value={formik.values.login}
            onChange={formik.handleChange}
            error={formik.touched.login && !!formik.errors.login}
            helperText = {formik.touched.login && formik.errors.login}          
        />
        <Button variant="contained" type='submit'>login</Button>
    </form>
  )
}
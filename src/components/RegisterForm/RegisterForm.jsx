import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'

export default function RegisterForm(){

    const registerSchema = yup.object({
        register: yup.string().required('this field is required')
    })


    const formik = useFormik({
        initialValues: {
            register: ''
        },
        onSubmit: (values, {resetForm}) => {
            const storage = JSON.parse(localStorage.getItem('PocketDictionary')) ?? null
            const user = {
                userName: values.register,
                userId: Date.now()
            }
            if(storage){
                const isRegistered = storage.users.find(({userName}) => userName === user.userName) 
                if(isRegistered){
                    alert('already registered')
                }else{
                    const newStorage = {...storage, users:  [...storage.users, user ] } 
                    localStorage.setItem('PocketDictionary', JSON.stringify(newStorage))
                }
            }else{
                const newStorage = {users: [user]}
                localStorage.setItem('PocketDictionary', JSON.stringify(newStorage))
            }    
            
            resetForm()
        },
        validationSchema: registerSchema
    })
    
  
    return ( 
        <form onSubmit={formik.handleSubmit}>
            <TextField
                label = 'register'
                name='register'
                value={formik.values.register}
                onChange={formik.handleChange}
                error={formik.touched.register && !!formik.errors.register }
                helperText={formik.touched.register && formik.errors.register}              
            />
            <Button variant="contained" type='submit'>register</Button>
        </form>
    )
  }

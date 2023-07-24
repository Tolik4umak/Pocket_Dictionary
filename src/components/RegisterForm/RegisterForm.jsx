import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import s from './style.module.css'

export default function RegisterForm({setAuthMode}){

    const registerSchema = yup.object({
        register: yup.string()
            .required('this field is required')
            .test('nospace', 'not allowed to start with a space', (value) => {
                return !value.startsWith(' ');
              })
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
        <div className={s.container}>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                <TextField
                    label = 'register'
                    name='register'
                    value={formik.values.register}
                    onChange={formik.handleChange}
                    error={formik.touched.register && !!formik.errors.register }
                    helperText={formik.touched.register && formik.errors.register}              
                />
                <Button className={s.button} variant="contained" type='submit'>register</Button>
            </form>
            <Button onClick={() => setAuthMode('login')}>login </Button>

        </div>
    )
  }

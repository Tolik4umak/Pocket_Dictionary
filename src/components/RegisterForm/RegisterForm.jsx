import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useMemo } from 'react'
import * as yup from 'yup'
import s from './style.module.css'

export default function RegisterForm({setAuthMode}){

    const registerSchema = yup.object({
        register: yup.string()
            .required('this field is required')
            .test('nospace', 'not allowed to start with a space', (value) => {
                return !value.startsWith(' ');
              }),
        langFrom: yup.string().required('this field is required'),
        langTo: yup.string().required('this field is required')

    })


    const formik = useFormik({
        initialValues: {
            register: '',
            langFrom: '',
            langTo: ''
        },
        onSubmit: (values, {resetForm}) => {
            const storage = JSON.parse(localStorage.getItem('PocketDictionary')) ?? null
            const user = {
                userName: values.register,
                userId: Date.now(),
                langFrom: values.langFrom,
                langTo: values.langTo
            }
            if(storage){
                const isRegistered = storage.users.find(({userName}) => userName === user.userName) 
                if(isRegistered){
                    alert('already registered')
                }else{
                    const newStorage = {...storage, users:  [...storage.users, user ] } 
                    localStorage.setItem('PocketDictionary', JSON.stringify(newStorage))
                    console.log(newStorage)
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
                    label = 'User name'
                    name='register'
                    value={formik.values.register}
                    onChange={formik.handleChange}
                    error={formik.touched.register && !!formik.errors.register }
                    helperText={formik.touched.register && formik.errors.register}              
                />

                <FormControl  error = {(formik.touched.langFrom && !!formik.errors.langFrom) ? true : false}>
                    <InputLabel id="langFrom">Language to learn</InputLabel>
                    <Select
                        labelId="langFrom"
                        value={formik.values.langFrom}
                        onChange={formik.handleChange}
                        label="Language to learn"
                        name='langFrom'
                    >
                        <MenuItem disabled = { formik.values.langTo === 'en'} value='en'>English</MenuItem>
                        <MenuItem disabled = { formik.values.langTo === 'de'} value='de'>German</MenuItem>
                        <MenuItem disabled = { formik.values.langTo === 'uk'} value='uk'>Ukrainian</MenuItem>
                        <MenuItem disabled = { formik.values.langTo === 'ru'} value='ru'>Russian</MenuItem>
                    </Select>
                    {(formik.touched.langFrom && !!formik.errors.langFrom) && <FormHelperText>{formik.errors.langFrom }</FormHelperText>}
                </FormControl>

                <FormControl  error = {(formik.touched.langTo && !!formik.errors.langTo) ? true : false}>
                    <InputLabel id="langTo">Native language</InputLabel>
                    <Select
                        labelId="langTo"
                        value={formik.values.langTo}
                        onChange={formik.handleChange}
                        label="Native language"
                        name='langTo'
                    >
                        <MenuItem disabled = { formik.values.langFrom === 'en'} value='en'>English</MenuItem>
                        <MenuItem disabled = { formik.values.langFrom === 'de'} value='de'>German</MenuItem>
                        <MenuItem disabled = { formik.values.langFrom === 'uk'} value='uk'>Ukrainian</MenuItem>
                        <MenuItem disabled = { formik.values.langFrom === 'ru'} value='ru'>Russian</MenuItem>
                    </Select>
                    {(formik.touched.langTo && !!formik.errors.langTo) && <FormHelperText>{formik.errors.langTo }</FormHelperText>}
                </FormControl>

                <Button className={s.button} variant="contained" type='submit'>register</Button>
            </form>

            <p style={{margin: '0 auto'}}>Already have an account ? <Button onClick={() => setAuthMode('login')}>LOG IN </Button> </p>
     
            {/* <Button onClick={() => setAuthMode('login')}>Already have an account ? LOG IN </Button> */}

        </div>
    )
  }

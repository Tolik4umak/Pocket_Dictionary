import { Button, TextField, TextareaAutosize } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import s from './style.module.css'

export default function NewCardForm({origin, translation , picture, description, handleForm, buttonName }) {

  const cardShema = yup.object({
    origin: yup.string()
      .required('this field is required')
      .test('nospace', 'not allowed to start with a space', (value) => {
        return !value.startsWith(' ');
      }),
    translation: yup.string()
    .required('this field is required')
    .test('nospace', 'not allowed to start with a space', (value) => {
      return !value.startsWith(' ');
    })
  })

  const formik = useFormik({
    initialValues: {
        origin: `${origin ?? ''}`,
        translation: `${translation ?? ''}`,
        picture: `${picture ?? ''}`,
        description: `${description ?? ''}`
    },
    onSubmit: (value, funk) => {
        handleForm(value, funk)
    },
    validationSchema: cardShema
  })  

  return (
    <form className={s.form} onSubmit={formik.handleSubmit}>
        <TextField
            variant = 'outlined'
            label = 'origin worg'
            name = 'origin'
            value = {formik.values.origin}
            onChange = {formik.handleChange}
            error = {formik.touched.origin && !!formik.errors.origin}
            helperText = {formik.touched.origin && formik.errors.origin}
        />
        <TextField
            variant = 'outlined'
            label = 'translation'
            name = 'translation'
            value={formik.values.translation}
            onChange = {formik.handleChange}
            error = {formik.touched.translation && !!formik.errors.translation}
            helperText = {formik.touched.translation && formik.errors.translation}
        />
        <TextField
            variant = 'outlined'
            label = 'link for photo'
            name = 'picture'
            value={formik.values.picture}
            onChange = {formik.handleChange}
            error = {formik.touched.picture && !!formik.errors.picture}
            helperText = {formik.touched.picture && formik.errors.picture}
        />
        <TextareaAutosize 
            value={formik.values.description} 
            onChange = {formik.handleChange}
            name = 'description'
            placeholder="description"
            minRows={4}
            className={s.description}
        />
        <Button 
            type='submit' 
            variant="contained"
            className={s.button}
        >
                {buttonName ?? 'Create Card'}
        </Button>
    </form>
  )
}

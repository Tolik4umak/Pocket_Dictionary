import { Button, TextField, TextareaAutosize } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import s from './style.module.css'


const req = (from, to, func) => {
  return (word) => {
    if(word){
      return fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=${from}&tl=${to}&q=${word}`)
      .then(res => res.json())
      .then(data => {
        let word = data[0][0][0][0].toUpperCase() + data[0][0][0].slice(1)
        func(word)
      })
    }else{
      func('')
    }
  }
}


export default function NewCardForm({origin, translation , picture, description, handleForm, buttonName }) {

  const [fetchTranslate, setFetchTranslate] = useState('')
  const [fetchOrigin, setFetchOrigin] = useState('')
  const translateFromOrigin = req('en', 'ru', setFetchTranslate)
  const translateFromForing = req('ru', 'en', setFetchOrigin)
  
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

  useEffect(() => {
    const curOrigin = formik.values.origin
    const curTranslation = formik.values.translation
    if(!curOrigin){
      translateFromOrigin(curOrigin)
    } 

    if(!curTranslation){
      translateFromForing(curTranslation)
    } 
  },[formik])


  const originHandleChange = (e) => {
    console.log(e)
    formik.handleChange(e)
    const word = e.target.value
    translateFromOrigin(word.trim())
  }

  const translationHandleChange = (e) => {
    formik.handleChange(e)
    const word = e.target.value
    translateFromForing(word.trim())
  }

  const fillOrigin = (e) => {
    formik.handleChange({target: {name: 'origin', value: fetchOrigin}})
  }
  const fillTranslation = (e) => {
    formik.handleChange({target: {name: 'translation', value: fetchTranslate}})
  }

  return (
    <form className={s.form} onSubmit={formik.handleSubmit}>
        <div className={s.input_wrapper}>
          {fetchOrigin && <p onClick={fillOrigin} className={s.input_clue}>{fetchOrigin}</p>}
          <TextField
              variant = 'outlined'
              label = 'origin worg'
              name = 'origin'
              value = {formik.values.origin}
              onChange = {originHandleChange}
              onFocus={(e) => {
                setFetchOrigin('')
                originHandleChange(e)
              }}
              error = {formik.touched.origin && !!formik.errors.origin}
              helperText = {formik.touched.origin && formik.errors.origin}
          />
        </div>
        <div className={s.input_wrapper}>
          {fetchTranslate && <p onClick={fillTranslation} className={s.input_clue}>{fetchTranslate}</p>}
          <TextField
              variant = 'outlined'
              label = 'translation'
              name = 'translation'
              value={formik.values.translation}
              onChange = {translationHandleChange}
              onFocus={(e) => {
                setFetchTranslate('')
                translationHandleChange(e)
              }}
              error = {formik.touched.translation && !!formik.errors.translation}
              helperText = {formik.touched.translation && formik.errors.translation}
          />
        </div>
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

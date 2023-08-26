import React, {useRef, useState } from 'react'
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useSelector } from 'react-redux';





export default function VoiceButton({sx, className, style, textToSpeech}) {
  const langs = [
    {
        num: 3,
        lang: 'en'
    },
    {
        num: 0,
        lang: 'de'
    },
    {
        num: 9,
        lang: 'uk'
    },
    {
        num: 15,
        lang: 'ru'
    },
  ]

  const btn = useRef()  

 
  const curLang = useSelector(({user}) => {
    const targert = langs.find(({lang}) => lang === user.currentUser.langFrom )
    return targert?.num || 3
  })
  const [volume , setVolume] = useState(false)

  const synth = window.speechSynthesis
  const voices = synth.getVoices()
  const utterThis = new SpeechSynthesisUtterance(textToSpeech)
  utterThis.voice = voices[curLang]

  const speech = (word) => {
    synth.speak(utterThis)
    setVolume(true)
    const interval = setInterval(() => {
        if(!synth.speaking) {
            setVolume(false)
            clearInterval(interval)
        }
    },20)
  }  

  return (
    <VolumeUpIcon
      ref={btn}  
      onClick={() => speech(textToSpeech)}
      className={className}
      sx={sx}  
      style={{
        ...style,
        transform: volume ? 'scale(1.2)' : 'scale(1)'
      }}
      color={volume? 'primary' : 'secondary'}
    />
  )
}

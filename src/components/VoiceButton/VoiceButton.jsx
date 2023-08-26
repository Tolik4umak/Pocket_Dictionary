import React, {useRef, useState } from 'react'
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useSelector } from 'react-redux';


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


export default function VoiceButton({sx, className, style, textToSpeech}) {


  const btn = useRef()  
 
  const curLang = useSelector(({user}) => {
    const targert = langs.find(({lang}) => lang === user.currentUser.langFrom )
    console.log(targert.num)
    return targert?.num || 3
  })
  const [volume , setVolume] = useState(false)

  const speech = (word) => {
    const synth = window.speechSynthesis

    const voices = synth.getVoices()
    const utterThis = new SpeechSynthesisUtterance(word)
    utterThis.voice = voices[curLang]
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

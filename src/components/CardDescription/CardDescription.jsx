import React from 'react'

export default function CardDescription({description}) {


  const descrArr = description.split('\n') 
  
  return (
    <>
        {descrArr.map( (paragraph, i) => <p style={{margin: '0 0 10px'}} key={i}>{paragraph}</p> )}
    </>
  )


}

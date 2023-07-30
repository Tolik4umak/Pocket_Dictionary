import React from 'react'
import { hundredEngWords } from '../../dictionaryCollections'
import { useDispatch, useSelector } from 'react-redux'
import { addNewList } from '../../store/userSlice'

export default function CardsCollections() {


    const dispatch = useDispatch()


    const click = () => {
        const list = JSON.parse(JSON.stringify(hundredEngWords))
        const tempList = list.map(c => ({...c, progress: 0}))
        dispatch(addNewList(tempList))
    }

  return (
    <div>
       <p>Here will be displayd your cards</p>
       <p>For now you have no cards in your dictionary</p>
       <p>
        You can add them manually and/or just use some of ours collection
        which also are available in user settings any time 
       </p>

        <br />
        <br />

       <button onClick={click}>add 100 eng words</button>

    </div>
  )
}

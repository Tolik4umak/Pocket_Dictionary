import React from 'react'
import { hundredEngWords , addCollection } from '../../dictionaryCollections'
import { useDispatch } from 'react-redux'
import { addNewList } from '../../store/userSlice'

export default function CardsCollections({currentUser}) {

    const dispatch = useDispatch()

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

       <button onClick={() => addCollection(currentUser,hundredEngWords, dispatch, addNewList)}>add 100 eng words</button>

    </div>
  )
}

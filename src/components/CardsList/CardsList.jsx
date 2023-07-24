import SingleCard from '../SingleCard/SingleCard'
import s from './style.module.css'

export default function CardsList({list}) {


  return (
    <div className={s.cardlist}>
        {
            list.map(card => <SingleCard key={card.id} {...card}/>)
        }
    </div>
  )
}

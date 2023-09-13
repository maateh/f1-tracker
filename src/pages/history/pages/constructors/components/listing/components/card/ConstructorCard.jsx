import { useNavigate } from 'react-router-dom'

// components
import ConstructorName from './components/ConstructorName'
import ConstructorNationality from './components/ConstructorNationality'
import ConstructorWiki from './components/ConstructorWiki'

// styles
import './ConstructorCard.css'

const ConstructorCard = ({ constructor, lastRef }) => {
  const navigate = useNavigate()

  return (
    <li
      className="constructor-card__container"
      ref={lastRef || undefined}
      onClick={() => navigate(`/profile/constructor/${constructor.id}`)}
    >
      <ConstructorName name={constructor.name} />
      <ConstructorNationality nationality={constructor.nationality} />
      <ConstructorWiki link={constructor.wiki} />
    </li>
  )
}

export default ConstructorCard

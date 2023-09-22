import { useNavigate } from 'react-router-dom'

// components
import Linking from '../../../../../../../../components/linking/Linking'

// constants
import { LINKING_POS_BOTTOM_LEFT, LINKING_SIZE_SMALL } from '../../../../../../../../components/linking/LinkingConstants'

// icons
import FlagIcon from '@mui/icons-material/Flag'
import PublicIcon from '@mui/icons-material/Public'

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
      <h3 className="constructor-name">{constructor.name}</h3>
      <p className="constructor-nationality icon__container">
        <FlagIcon fontSize='small' />
        <span>{constructor.nationality}</span>
      </p>

      <Linking
        text="Wikipedia"
        tooltipText="Go to the Wikipedia page"
        link={constructor.wiki}
        icon={<PublicIcon />}
        launchIcon={true}
        size={LINKING_SIZE_SMALL}
        positioningClasses={LINKING_POS_BOTTOM_LEFT}
        darkMode={true}
      />
    </li>
  )
}

export default ConstructorCard

// components
import Linking from '../../../../../../../components/linking/Linking'

// constants
import { SIZE_SMALL } from '../../../../../../../components/linking/LinkingConstants'

// icons
import SegmentIcon from '@mui/icons-material/Segment'
import InfoIcon from '@mui/icons-material/Info'

const WeekendLinks = ({ weekend }) => {
  return weekend.sessions.race.isOver() && (
    <div className="weekend-links__container">
      <Linking
        text="Race results"
        tooltipText="Race results"
        link={`/results/${weekend.year}/rounds/${weekend.round}/race`}
        icon={<SegmentIcon />}
        launchIcon={false}
        size={SIZE_SMALL}
        darkMode={true}
      />

      <Linking
        text="More Info"
        tooltipText="Go to the Wikipedia page"
        link={weekend.wiki}
        icon={<InfoIcon />}
        launchIcon={false}
        size={SIZE_SMALL}
        darkMode={true}
      />
    </div>
  )
}

export default WeekendLinks

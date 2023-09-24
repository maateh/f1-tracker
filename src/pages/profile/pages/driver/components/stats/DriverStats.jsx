// components
import Statistics from '../../../../components/statistics/Statistics'

// icons
import SportsScoreIcon from '@mui/icons-material/SportsScore'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import Looks3Icon from '@mui/icons-material/Looks3'
import PlusOneIcon from '@mui/icons-material/PlusOne'

// import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import FlagCircleIcon from '@mui/icons-material/FlagCircle'
import StarsIcon from '@mui/icons-material/Stars'

import AlarmOnIcon from '@mui/icons-material/AlarmOn'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import UnfoldLessDoubleIcon from '@mui/icons-material/UnfoldLessDouble'
import StarHalfIcon from '@mui/icons-material/StarHalf'
// import StarBorderIcon from '@mui/icons-material/StarBorder'

// styles
import './DriverStats.css'

const MOCK_RACES = [
  {
    label: "Race starts",
    data: "x times",
    icon: <SportsScoreIcon />
  },
  {
    label: "Best race result",
    data: "#x",
    icon: <StarBorderIcon />
  },
  {
    label: "Races won",
    data: "x times",
    icon: <EmojiEventsIcon />
  },
  {
    label: "Podium finishes",
    data: "x times",
    icon: <Looks3Icon />
  },
  {
    label: "Finished in scoring positions",
    data: "x times",
    icon: <PlusOneIcon />
  }
]

const MOCK_ACHIEVEMENTS = [
  {
    label: "Championships won",
    data: "x times",
    icon: <EmojiEventsIcon />
  },
  {
    label: "Participate in a season",
    data: "x times",
    icon: <FlagCircleIcon />
  },
  {
    label: "Best championship standings result",
    data: "#x",
    icon: <StarsIcon />
  }
]

const MOCK_QUALIFYINGS = [
  {
    label: "Best qualifying result",
    data: "#x",
    icon: <AlarmOnIcon />
  },
  {
    label: "Qualifyings won",
    data: "x times",
    icon: <WorkspacePremiumIcon />
  },
  {
    label: "Reached the front row",
    data: "x times",
    icon: <UnfoldLessDoubleIcon />
  },
  {
    label: "Reached Q3",
    data: "x times",
    icon: <StarHalfIcon />
  },
  {
    label: "Reached Q2",
    data: "x times",
    icon: <StarBorderIcon />
  }
]

const DriverStats = () => {
  return (
    <section className="driver-stats__container">
      <Statistics title="Races Results" stats={MOCK_RACES} />
      <Statistics title="Achievements" stats={MOCK_ACHIEVEMENTS} />
      <Statistics title="Qualifyings Results" stats={MOCK_QUALIFYINGS} />
    </section>
  )
}

export default DriverStats

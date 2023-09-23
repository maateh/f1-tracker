// components
import Statistic from "../statistic/Statistic"
import LoadingHandler from "../../../../../../../components/loading/LoadingHandler"

// hooks
import useDriverAchievementsQuery from "./hooks/useDriverAchievementsQuery"

// context
import useDriverProfileContext from "../../../../context/hooks/useDriverProfileContext"

// icons
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import FlagCircleIcon from '@mui/icons-material/FlagCircle'
import StarsIcon from '@mui/icons-material/Stars'

const DriverAchievements = () => {
  const { standings } = useDriverProfileContext()
  const {
    isLoading,
    isError,
    error
  } = useDriverAchievementsQuery()

  return isLoading || isError || !standings ? (
    <LoadingHandler
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  ) : (
    <section className="driver-achievements__container">
      <h3 className="driver-stats__title">Achievements</h3>

      <div className="driver-stats-data__container">
        <Statistic
          label="Championships won"
          data="x times"
          icon={<EmojiEventsIcon />}
        />

        <Statistic
          label="Participate in a season"
          data="x times"
          icon={<FlagCircleIcon />}
        />

        <Statistic
          label="Best championship standings result"
          data="#x"
          icon={<StarsIcon />}
        />
      </div>
    </section>
  )
}

export default DriverAchievements

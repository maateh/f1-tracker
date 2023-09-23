// components
import Statistic from "../statistic/Statistic"
import LoadingHandler from "../../../../../../../components/loading/LoadingHandler"

// hooks
import useDriverRacesQuery from "./hooks/useDriverRacesQuery"

// context
import useDriverProfileContext from "../../../../context/hooks/useDriverProfileContext"

// icons
import SportsScoreIcon from '@mui/icons-material/SportsScore'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import Looks3Icon from '@mui/icons-material/Looks3'
import PlusOneIcon from '@mui/icons-material/PlusOne'

const DriverRaces = () => {
  const { races } = useDriverProfileContext()
  const {
    isLoading,
    isError,
    error
  } = useDriverRacesQuery()

  return isLoading || isError || !races ? (
    <LoadingHandler
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  ) : (
    <section className="driver-races__container">
      <h3 className="driver-stats__title">Races Results</h3>

      <div className="driver-stats-data__container">
        <Statistic
          label="Race starts" 
          data="x times"
          icon={<SportsScoreIcon />}
        />

        <Statistic
          label="Best race result"
          data="#x"
          icon={<StarBorderIcon />}
        />

        <Statistic
          label="Races won" 
          data="x times"
          icon={<EmojiEventsIcon />}
        />

        <Statistic
          label="Podium finishes" 
          data="x times"
          icon={<Looks3Icon />}
        />

        <Statistic
          label="Finished in scoring positions" 
          data="x times"
          icon={<PlusOneIcon />}
        />
      </div>
    </section>
  )
}

export default DriverRaces

// components
import Statistic from "../statistic/Statistic"
import LoadingHandler from "../../../../../../../components/loading/LoadingHandler"

// hooks
import useDriverQualifyingsQuery from "./hooks/useDriverQualifyingsQuery"

// context
import useDriverProfileContext from "../../../../context/hooks/useDriverProfileContext"

// icons
import AlarmOnIcon from '@mui/icons-material/AlarmOn'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import UnfoldLessDoubleIcon from '@mui/icons-material/UnfoldLessDouble'
import StarHalfIcon from '@mui/icons-material/StarHalf'
import StarBorderIcon from '@mui/icons-material/StarBorder'

const DriverQualifyings = () => {
  const { qualifyings } = useDriverProfileContext()
  const {
    isLoading,
    isError,
    error
  } = useDriverQualifyingsQuery()

  return isLoading || isError || !qualifyings ? (
    <LoadingHandler
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  ) : (
    <section className="driver-qualifyings__container">
      <h3 className="driver-stats__title">Qualifyings Results</h3>

      <div className="driver-stats-data__container">
        <Statistic
          label="Best qualifying result"
          data="#x"
          icon={<AlarmOnIcon />}
        />

        <Statistic
          label="Qualifyings won"
          data="x times"
          icon={<WorkspacePremiumIcon />}
        />

        <Statistic
          label="Reached the front row"
          data="x times"
          icon={<UnfoldLessDoubleIcon />}
        />

        <Statistic
          label="Reached Q3"
          data="x times"
          icon={<StarHalfIcon />}
        />

        <Statistic
          label="Reached Q2"
          data="x times"
          icon={<StarBorderIcon />}
        />
      </div>
    </section>
  )
}

export default DriverQualifyings

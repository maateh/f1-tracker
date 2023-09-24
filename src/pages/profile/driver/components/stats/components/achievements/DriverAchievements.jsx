// components
import Statistic from "../statistic/Statistic"
import LoadingHandler from "../../../../../../../components/loading/LoadingHandler"

// hooks
import useDriverAchievementsQuery from "./hooks/useDriverAchievementsQuery"

// context
import useDriverProfileContext from "../../../../context/hooks/useDriverProfileContext"


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

    </section>
  )
}

export default DriverAchievements

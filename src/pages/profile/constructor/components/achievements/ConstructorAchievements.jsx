// components
import LoadingHandler from "../../../../../components/loading/LoadingHandler"

// hooks
import useConstructorAchievementsQuery from "./hooks/useConstructorAchievementsQuery"

// context
import useConstructorProfileContext from "../../context/hooks/useConstructorProfileContext"

// styles
import './ConstructorAchievements.css'

const ConstructorAchievements = () => {
  const { standings } = useConstructorProfileContext()
  const {
    isLoading,
    isError,
    error
  } = useConstructorAchievementsQuery()

  return isLoading || isError || !standings ? (
    <LoadingHandler
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  ) : (
    <section className="constructor-achievements__container">
      ConstructorAchievements
    </section>
  )
}

export default ConstructorAchievements

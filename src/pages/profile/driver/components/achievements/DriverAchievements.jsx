// context
import useDriverProfileContext from "../../context/hooks/useDriverProfileContext"

// styles
import './DriverAchievements.css'

const DriverAchievements = () => {
  const {} = useDriverProfileContext()

  return (
    <section className="driver-achievements__container">
      DriverAchievements
    </section>
  )
}

export default DriverAchievements

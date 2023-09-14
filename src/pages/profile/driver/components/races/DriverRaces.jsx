// context
import useDriverProfileContext from "../../context/hooks/useDriverProfileContext"

// styles
import './DriverRaces.css'

const DriverRaces = () => {
  const {} = useDriverProfileContext()

  return (
    <section className="driver-races__container">
      DriverRaces
    </section>
  )
}

export default DriverRaces

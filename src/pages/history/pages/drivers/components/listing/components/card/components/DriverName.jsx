// styles
import '../DriverCard.css'

const DriverName = ({ name, number }) => {
  return <h3 className="driver-name">{name} {number}</h3>
}

export default DriverName

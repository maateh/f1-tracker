import { Link } from 'react-router-dom'

// hooks
import useCircuitQuery from './hooks/useCircuitQuery'

// components
import LoadingHandler from "../../../components/loading/LoadingHandler"

// icons
import LaunchIcon from '@mui/icons-material/Launch'

// styles
import './CircuitProfile.css'

const CircuitProfile = () => {
  const {
    data: circuit,
    isLoading,
    isError,
    error
  } = useCircuitQuery()

  return isLoading || isError ? (
    <LoadingHandler
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  ) : (
    <div className="circuit-profile__container">
      <h2 className="circuit-name">{circuit.name}</h2>
      <Link
        className="circuit-locality icon__container"
        to={circuit.getMapsLink()}
      >
        <LaunchIcon fontSize='small' />
        <span>{circuit.location.country}, {circuit.location.locality}</span>
      </Link>
    </div>
  )
}

export default CircuitProfile

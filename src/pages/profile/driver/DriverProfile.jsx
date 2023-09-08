// hooks
import useDriverQuery from './hooks/useDriverQuery'

// components
import LoadingHandler from "../../../components/loading/LoadingHandler"

// styles
import './DriverProfile.css'

const DriverProfile = () => {
  const {
    data: driver,
    isLoading,
    isError,
    error
  } = useDriverQuery()

  return isLoading || isError ? (
    <LoadingHandler
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  ) : (
    <div className="driver-profile__container">
      <h2 className="driver-name">{driver.fullName}</h2>
      <p className="driver-code-number">{driver.code} {driver.number}</p>
      <p className="driver-nationality">{driver.nationality}</p>
      <p className="driver-date-of-birth">{driver.formattedDateOfBirth}</p>
    </div>
  )
}

export default DriverProfile

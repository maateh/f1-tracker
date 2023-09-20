// components
import LoadingHandler from '../../../../../components/loading/LoadingHandler'

// hooks
import useDriverInformationQuery from './hooks/useDriverInformationQuery'

// context
import useDriverProfileContext from '../../context/hooks/useDriverProfileContext'

// styles
import './DriverInformation.css'

const DriverInformation = () => {
  const { driver } = useDriverProfileContext()
  const {
    isLoading,
    isError,
    error
  } = useDriverInformationQuery()

  return isLoading || isError || !driver ? (
    <LoadingHandler
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  ) : (
    <section className="driver-information__container">
      <h2 className="driver-name">{driver.fullName}</h2>
      <p className="driver-code-number">{driver.code} {driver.number}</p>
      <p className="driver-nationality">{driver.nationality}</p>
      <p className="driver-date-of-birth">{driver.formattedDateOfBirth}</p>
    </section>
  )
}

export default DriverInformation

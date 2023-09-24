// components
import Linking from '../../../../../../components/linking/Linking'
import LoadingHandler from '../../../../../../components/loading/LoadingHandler'

// hooks
import useDriverInformationQuery from './hooks/useDriverInformationQuery'

// context
import useDriverProfileContext from '../../context/hooks/useDriverProfileContext'

// constants
import { LINKING_SIZE_MEDIUM } from '../../../../../../components/linking/LinkingConstants'

// icons
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import FlagIcon from '@mui/icons-material/Flag'
import CakeIcon from '@mui/icons-material/Cake'
import PublicIcon from '@mui/icons-material/Public'

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
      <h2 className="driver-name page__title">{driver.fullName}</h2>

      <div className="driver-information-data__container">
        <p className="driver-tag icon__container">
          <AlternateEmailIcon />
          <span>{driver.code} {driver.formattedNumber}</span>
        </p>

        <p className="driver-date-of-birth icon__container">
          <CakeIcon />
          <span>{driver.formattedDateOfBirth}</span>
        </p>

        <p className="driver-nationality icon__container">
          <FlagIcon />
          <span>{driver.nationality}</span>
        </p>
      </div>

      <Linking
        text='Wikipedia page'
        tooltipText="Go to the Wikipedia page"
        link={driver.wiki}
        icon={<PublicIcon />}
        size={LINKING_SIZE_MEDIUM}
        launchIcon={true}
      />
    </section>
  )
}

export default DriverInformation

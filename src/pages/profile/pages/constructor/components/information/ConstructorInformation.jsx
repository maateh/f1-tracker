// components
import Linking from "../../../../../../components/linking/Linking"
import LoadingHandler from "../../../../../../components/loading/LoadingHandler"

// hooks
import useConstructorInformationQuery from "./hooks/useConstructorInformationQuery"

// context
import useConstructorProfileContext from "../../context/hooks/useConstructorProfileContext"

// constants
import { LINKING_SIZE_MEDIUM } from "../../../../../../components/linking/LinkingConstants"

// icons
import FlagIcon from '@mui/icons-material/Flag'
import PublicIcon from '@mui/icons-material/Public'

// styles
import './ConstructorInformation.css'

const ConstructorInformation = () => {
  const { constructor } = useConstructorProfileContext()
  const {
    isLoading,
    isError,
    error
  } = useConstructorInformationQuery()

  return isLoading || isError || !constructor ? (
    <LoadingHandler
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  ) : (
    <section className="constructor-information__container">
      <h2 className="constructor-name page__title">{constructor.name}</h2>

      <p className="constructor-nationality icon__container">
        <FlagIcon />
        <span>{constructor.nationality}</span>
      </p>

      <Linking
        text='Wikipedia page'
        tooltipText="Go to the Wikipedia page"
        link={constructor.wiki}
        icon={<PublicIcon />}
        size={LINKING_SIZE_MEDIUM}
        launchIcon={true}
      />
    </section>
  )
}

export default ConstructorInformation

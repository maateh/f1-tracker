// components
import LoadingHandler from "../../../../../components/loading/LoadingHandler"

// hooks
import useConstructorInformationQuery from "./hooks/useConstructorInformationQuery"

// context
import useConstructorProfileContext from "../../context/hooks/useConstructorProfileContext"

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
      <h2 className="constructor-name">{constructor.name}</h2>
      <p className="constructor-nationality">{constructor.nationality}</p>
    </section>
  )
}

export default ConstructorInformation

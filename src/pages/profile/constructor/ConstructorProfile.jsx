// hooks
import useConstructorQuery from './hooks/useConstructorQuery'

// components
import LoadingHandler from "../../../components/loading/LoadingHandler"

// styles
import './ConstructorProfile.css'

const ConstructorProfile = () => {
  const {
    data: constructor,
    isLoading,
    isError,
    error
  } = useConstructorQuery()

  return isLoading || isError ? (
    <LoadingHandler
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  ) : (
    <div className="constructor-profile__container">
      <h2 className="constructor-name">{constructor.name}</h2>
      <p className="constructor-nationality">{constructor.nationality}</p>
    </div>
  )
}

export default ConstructorProfile

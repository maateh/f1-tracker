// components
import LoadingHandler from "../../../../../../components/loading/LoadingHandler"

// hooks
import useConstructorQualifyingsQuery from "./hooks/useConstructorQualifyingsQuery"

// context
import useConstructorProfileContext from "../../context/hooks/useConstructorProfileContext"

// styles
import './ConstructorQualifyings.css'

const ConstructorQualifyings = () => {
  const { qualifyings } = useConstructorProfileContext()
  const {
    isLoading,
    isError,
    error
  } = useConstructorQualifyingsQuery()

  return isLoading || isError || !qualifyings ? (
    <LoadingHandler
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  ) : (
    <section className="constructor-qualifyings__container">
      ConstructorQualifyings
    </section>
  )
}

export default ConstructorQualifyings

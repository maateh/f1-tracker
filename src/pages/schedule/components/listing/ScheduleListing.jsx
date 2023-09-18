// hooks
import useScheduleListingQuery from "./hooks/useScheduleListingQuery"

// components
import ScheduleTitle from "./components/title/ScheduleTitle"
import Cards from "../../../../components/listing/cards/Cards"
import LoadingHandler from "../../../../components/loading/LoadingHandler"

// context
import useListingContext from '../../../../components/listing/context/hooks/useListingContext'

const ScheduleListing = () => {
  const { cards } = useListingContext()
  const {
    isLoading,
    isError,
    error
  } = useScheduleListingQuery()

  return (
    <div className="listing__container">
      {isLoading || isError ? (
        <LoadingHandler
          isLoading={isLoading}
          isError={isError}
          error={error}
        />
      ) : cards && (
        <>
          <ScheduleTitle />
          <Cards cards={cards} />
        </>
      )}
    </div>
  )
}

export default ScheduleListing

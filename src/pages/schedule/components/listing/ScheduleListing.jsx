// hooks
import useScheduleListingQuery from "./hooks/useScheduleListingQuery"

// components
import ScheduleTitle from "./components/title/ScheduleTitle"
import Cards from "../../../../components/listing/cards/Cards"
import ListingSkeleton from "../../../../components/skeletons/listing/ListingSkeleton"

// context
import useListingContext from '../../../../components/listing/context/hooks/useListingContext'

const ScheduleListing = () => {
  const { cards } = useListingContext()
  const {
    isLoading,
    isError
  } = useScheduleListingQuery()

  return (
    <div className="listing__container">
      {isLoading || isError ? (
        <ListingSkeleton
          titleRequired={true}
          cardsCounter={9}
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

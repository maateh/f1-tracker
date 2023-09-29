import { Suspense, lazy } from "react"
import { useParams } from "react-router-dom"

// components
const RoundLapsListing = lazy(() => import('../components/listing/RoundLapsListing'))
const DriverLapsListing = lazy(() => import('../components/listing/DriverLapsListing'))
import ListingSkeleton from "../../../../../components/skeletons/listing/ListingSkeleton"

// models
import FilterOptionModel from '../../../../../model/filter/FilterOption'

const LapsLoader = () => {
  const { driverId } = useParams()

  return driverId === FilterOptionModel.ALL.value ? (
    <Suspense fallback={
      <ListingSkeleton
        titleRequired={true}
        cardsCounter={1}
        // tableColumnsCounter={4}
        // tableRowsCounter={10}
      />
    }>
      <RoundLapsListing />
    </Suspense>
  ) : (
    <Suspense fallback={
      <ListingSkeleton
        titleRequired={true}
        cardsCounter={1}
        // tableColumnsCounter={4}
        // tableRowsCounter={10}
      />
    }>
      <DriverLapsListing />
    </Suspense>
  )
}

export default LapsLoader

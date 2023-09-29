import { Suspense, lazy } from 'react'
import { useParams } from 'react-router-dom'

// components
const RoundPitsListing = lazy(() => import('../components/listing/RoundPitsListing'))
const DriverPitsListing = lazy(() => import('../components/listing/DriverPitsListing'))
import ListingSkeleton from '../../../../../components/skeletons/listing/ListingSkeleton'

// models
import FilterOptionModel from '../../../../../model/filter/FilterOption'

const PitsLoader = () => {
  const { driverId } = useParams()

  return driverId === FilterOptionModel.ALL.value ? (
    <Suspense fallback={
      <ListingSkeleton
        titleRequired={true}
        cardsCounter={1}
        tableRequired={true}
      />
    }>
      <RoundPitsListing />
    </Suspense>
  ) : (
    <Suspense fallback={
      <ListingSkeleton
        titleRequired={true}
        cardsCounter={1}
        tableRequired={true}
      />
    }>
      <DriverPitsListing />
    </Suspense>
  )
}

export default PitsLoader

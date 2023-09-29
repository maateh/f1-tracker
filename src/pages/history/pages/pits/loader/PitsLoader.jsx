import { Suspense, lazy } from 'react'
import { useParams } from 'react-router-dom'

// components
const RoundPitsListing = lazy(() => import('../components/listing/RoundPitsListing'))
const DriverPitsListing = lazy(() => import('../components/listing/DriverPitsListing'))

// models
import FilterOptionModel from '../../../../../model/filter/FilterOption'

const PitsLoader = () => {
  const { driverId } = useParams()

  return driverId === FilterOptionModel.ALL.value ? (
    <Suspense fallback={<p>ListingSkeleton - title, cards[1], table</p>}>
      <RoundPitsListing />
    </Suspense>
  ) : (
    <Suspense fallback={<p>ListingSkeleton - title, cards[1], table</p>}>
      <DriverPitsListing />
    </Suspense>
  )
}

export default PitsLoader

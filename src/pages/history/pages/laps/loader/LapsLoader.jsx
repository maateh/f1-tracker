import { lazy } from "react"
import { useParams } from "react-router-dom"

// components
const RoundLapsListing = lazy(() => import('../components/listing/RoundLapsListing'))
const DriverLapsListing = lazy(() => import('../components/listing/DriverLapsListing'))

// models
import FilterOptionModel from '../../../../../model/filter/FilterOption'

const LapsLoader = () => {
  const { driverId } = useParams()

  return driverId === FilterOptionModel.ALL.value 
    ? <RoundLapsListing /> 
    : <DriverLapsListing />
}

export default LapsLoader

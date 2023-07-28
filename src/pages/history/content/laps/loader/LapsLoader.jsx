// loaders
import { roundLapsLoader } from './round/RoundLapsLoader'
import { driverLapsLoader } from './driver/DriverLapsLoader'

// models
import FilterOption from '../../../../../model/filter/FilterOption'

export const lapsLoader = ({ params }) => {
  if (params.driverId === FilterOption.DEFAULT.value) {
    return driverLapsLoader(params)
  }
  return roundLapsLoader(params)
}

// loaders
import { roundLapsLoader } from './round/RoundLapsLoader'
import { driverLapsLoader } from './driver/DriverLapsLoader'

// models
import FilterOption from '../../../../../model/filter/FilterOption'

export const lapsLoader = ({ params, request: { url: rawUrl } }) => {
  const url = new URL(rawUrl)
  const page = url.searchParams.get('page') || 1

  if (params.driverId === FilterOption.ALL.value) {
    return roundLapsLoader({ ...params, page })
  }
  return driverLapsLoader({ ...params, page })
}

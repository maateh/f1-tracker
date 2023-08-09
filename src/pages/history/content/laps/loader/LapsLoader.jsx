// queries
import { roundLapsQuery } from './query/RoundLapsQuery'
import { driverLapsQuery } from './query/DriverLapsQuery'

// models
import FilterOption from '../../../../../model/filter/FilterOption'

export const lapsLoader = ({ params, request: { url: rawUrl } }) => {
  const url = new URL(rawUrl)
  const page = url.searchParams.get('page') || 1

  return params.driverId === FilterOption.ALL.value ?
    roundLapsQuery({ ...params, page }) : 
    driverLapsQuery({ ...params, page })
}

// queries
import { roundPitsQuery } from './query/RoundPitsQuery'
import { driverPitsQuery } from './query/DriverPitsQuery'

export const pitsLoader = ({ params, request: { url: rawUrl } }) => {
  const url = new URL(rawUrl)
  const page = url.searchParams.get('page') || 1
  
  return params.driverId === 'all' ? 
    roundPitsQuery({ ...params, page }) : 
    driverPitsQuery(params)
}

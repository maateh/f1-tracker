// queries
import { getRoundPitsQuery } from './query/RoundPitsQuery'
import { getDriverPitsQuery } from './query/DriverPitsQuery'

export const pitsLoader = ({ params, request: { url: rawUrl } }) => {
  const url = new URL(rawUrl)
  const page = url.searchParams.get('page') || 1
  
  return params.driverId === 'all' ? 
    getRoundPitsQuery({ ...params, page }) : 
    getDriverPitsQuery(params)
}

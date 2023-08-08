// models
import PitsListing from '../../../../../model/listing/history/pits/PitsListing'

// loaders
import { driverPitsLoader } from './driver/DriverPitsLoader'

export const pitsLoader = ({ params, request: { url: rawUrl } }) => {
  const url = new URL(rawUrl)
  const page = url.searchParams.get('page') || 1
  
  return params.driverId === 'all' ? {
    queryKey: ['listing', 'pits', params.year, params.round, page],
    queryFn: () => PitsListing.query(params.year, params.round, page)
  } : driverPitsLoader(params)
}

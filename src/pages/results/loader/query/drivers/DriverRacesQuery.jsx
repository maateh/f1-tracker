// model
import DriverRacesListing from "../../../../../model/listing/results/drivers/DriverRacesListing"

export const driverRacesQuery = ({ year, id: driverId }) => ({
  queryKey: ['listing', 'driverRacesResults', year, driverId],
  queryFn: () => DriverRacesListing.query(year, driverId)
})

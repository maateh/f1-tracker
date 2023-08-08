// model
import DriverRacesListing from "../../../../model/listing/results/drivers/DriverRacesListing"

export const driverRacesLoader = ({ year, id: driverId }) => {
  return {
    queryKey: ['listing', 'driverRacesResults', year, driverId],
    queryFn: () => DriverRacesListing.query(year, driverId)
  }
}

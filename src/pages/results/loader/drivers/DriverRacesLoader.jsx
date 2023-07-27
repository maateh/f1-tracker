// model
import DriverRacesListing from "../../../../model/listing/results/drivers/DriverRacesListing"

const driverRacesLoader = ({ year, id: driverId }) => {
  return {
    queryKey: ['listing', 'driverRacesResults', year, driverId],
    queryFn: () => DriverRacesListing.query(year, driverId)
  }
}

export default driverRacesLoader

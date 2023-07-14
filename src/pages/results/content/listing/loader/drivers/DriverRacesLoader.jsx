// model
import DriverRacesListing from "../../../../../../model/listing/drivers/DriverRacesListing"

const driverRacesLoader = ({ params: { year, id: driverId } }) => {
  return {
    queryKey: ['listing', 'driverRacesResults', year, driverId],
    queryFn: () => DriverRacesListing.query(year, driverId)
  }
}

export default driverRacesLoader

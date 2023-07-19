// model
import DriverQualifyingsListing from "../../../../../../model/listing/drivers/DriverQualifyingsListing"

const driverQualifyingsLoader = ({ params: { year, id: driverId } }) => {
  return {
    queryKey: ['listing', 'driverQualifyingsResults', year, driverId],
    queryFn: () => DriverQualifyingsListing.query(year, driverId)
  }
}

export default driverQualifyingsLoader

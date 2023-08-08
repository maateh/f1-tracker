// model
import DriverQualifyingsListing from "../../../../model/listing/results/drivers/DriverQualifyingsListing"

export const driverQualifyingsLoader = ({ year, id: driverId }) => {
  return {
    queryKey: ['listing', 'driverQualifyingsResults', year, driverId],
    queryFn: () => DriverQualifyingsListing.query(year, driverId)
  }
}

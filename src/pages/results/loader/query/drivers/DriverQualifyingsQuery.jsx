// model
import DriverQualifyingsListing from "../../../../../model/listing/results/drivers/DriverQualifyingsListing"

export const driverQualifyingsQuery = ({ year, id: driverId }) => ({
  queryKey: ['listing', 'driverQualifyingsResults', year, driverId],
  queryFn: () => DriverQualifyingsListing.query(year, driverId)
})

// models
import DriverPitsListing from "../../../../../../model/listing/history/pits/DriverPitsListing";

export const driverPitsLoader = ({ year, round, driverId }) => ({
  queryKey: ['listing', 'pits', year, round, driverId],
  queryFn: () => DriverPitsListing.query(year, round, driverId)
})

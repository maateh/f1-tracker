// models
import DriverLapsListing from "../../../../../../model/listing/history/laps/DriverLapsListing";

export const driverLapsQuery = ({ year, round, driverId, page }) => ({
  queryKey: ['listing', 'laps', year, round, driverId, page],
  queryFn: () => DriverLapsListing.query(year, round, driverId, page)
})

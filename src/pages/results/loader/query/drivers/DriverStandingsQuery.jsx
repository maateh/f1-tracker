// model
import DriverStandingsListing from "../../../../../model/listing/results/drivers/DriverStandingsListing"

export const driverStandingsQuery = ({ year }) => ({
  queryKey: ['listing', 'driverStandings', year],
  queryFn: () => DriverStandingsListing.query(year)
})

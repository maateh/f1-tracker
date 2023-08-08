// model
import DriverStandingsListing from "../../../../model/listing/results/drivers/DriverStandingsListing"

export const driverStandingsLoader = ({ year }) => {
  return {
    queryKey: ['listing', 'driverStandings', year],
    queryFn: () => DriverStandingsListing.query(year)
  }
}

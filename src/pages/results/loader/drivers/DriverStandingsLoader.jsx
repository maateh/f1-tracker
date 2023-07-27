// model
import DriverStandingsListing from "../../../../model/listing/results/drivers/DriverStandingsListing"

const driverStandingsLoader = ({ year }) => {
  return {
    queryKey: ['listing', 'driverStandings', year],
    queryFn: () => DriverStandingsListing.query(year)
  }
}

export default driverStandingsLoader

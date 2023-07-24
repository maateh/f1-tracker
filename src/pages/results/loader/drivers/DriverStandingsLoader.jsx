// model
import DriverStandingsListing from "../../../../model/listing/results/drivers/DriverStandingsListing"

const driverStandingsLoader = ({ params: { year } }) => {
  return {
    queryKey: ['listing', 'driverStandings', year],
    queryFn: () => DriverStandingsListing.query(year)
  }
}

export default driverStandingsLoader

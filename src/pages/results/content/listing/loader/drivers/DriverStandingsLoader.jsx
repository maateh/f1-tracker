// model
import DriverStandingsListing from "../../../../../../model/listing/drivers/DriverStandingsListing"

const driverStandingsLoader = ({ params: { year } }) => {
  return {
    queryKey: ['listing', 'driverStandings', year],
    queryFn: () => DriverStandingsListing.query(year)
  }
}

export default driverStandingsLoader

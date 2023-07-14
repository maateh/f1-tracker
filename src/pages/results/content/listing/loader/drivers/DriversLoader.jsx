// model
import DriversListing from "../../../../../../model/listing/drivers/DriversListing"

const driversLoader = ({ params: { year } }) => {
  return {
    queryKey: ['listing', 'driverStandings', year],
    queryFn: () => DriversListing.query(year)
  }
}

export default driversLoader

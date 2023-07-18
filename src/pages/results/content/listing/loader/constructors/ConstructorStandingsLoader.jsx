// model
import ConstructorStandingsListing from "../../../../../../model/listing/constructors/ConstructorStandingsListing"

const constructorStandingsLoader = ({ params: { year } }) => {
  return {
    queryKey: ['listing', 'constructorStandings', year],
    queryFn: () => ConstructorStandingsListing.query(year)
  }
}

export default constructorStandingsLoader

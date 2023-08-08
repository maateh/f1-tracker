// model
import ConstructorStandingsListing from "../../../../model/listing/results/constructors/ConstructorStandingsListing"

export const constructorStandingsLoader = ({ year }) => {
  return {
    queryKey: ['listing', 'constructorStandings', year],
    queryFn: () => ConstructorStandingsListing.query(year)
  }
}

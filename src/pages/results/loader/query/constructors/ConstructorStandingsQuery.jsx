// models
import ConstructorStandingsListing from "../../../../../model/listing/results/constructors/ConstructorStandingsListing"

export const constructorStandingsQuery = ({ year }) => ({
  queryKey: ['listing', 'constructorStandings', year],
  queryFn: () => ConstructorStandingsListing.query(year)
})

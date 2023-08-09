// models
import ConstructorRacesListing from "../../../../../model/listing/results/constructors/ConstructorRacesListing"

export const constructorRacesQuery = ({ year, id: constructorId }) => ({
  queryKey: ['listing', 'constructorRacesResults', year, constructorId],
  queryFn: () => ConstructorRacesListing.query(year, constructorId)
})

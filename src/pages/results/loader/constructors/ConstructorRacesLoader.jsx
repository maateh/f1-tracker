// model
import ConstructorRacesListing from "../../../../model/listing/results/constructors/ConstructorRacesListing"

export const constructorRacesLoader = ({ year, id: constructorId }) => {
  return {
    queryKey: ['listing', 'constructorRacesResults', year, constructorId],
    queryFn: () => ConstructorRacesListing.query(year, constructorId)
  }
}

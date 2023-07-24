// model
import ConstructorRacesListing from "../../../../model/listing/results/constructors/ConstructorRacesListing"

const constructorRacesLoader = ({ params: { year, id: constructorId } }) => {
  return {
    queryKey: ['listing', 'constructorRacesResults', year, constructorId],
    queryFn: () => ConstructorRacesListing.query(year, constructorId)
  }
}

export default constructorRacesLoader

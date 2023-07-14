// model
import ConstructorsListing from "../../../../../../model/listing/constructors/ConstructorsListing"

const constructorsLoader = ({ params: { year } }) => {
  return {
    queryKey: ['listing', 'constructorStandings', year],
    queryFn: () => ConstructorsListing.query(year)
  }
}

export default constructorsLoader

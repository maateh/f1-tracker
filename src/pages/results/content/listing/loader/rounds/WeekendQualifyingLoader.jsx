// models
import WeekendQualifyingListing from "../../../../../../model/listing/rounds/WeekendQualifyingListing"

const weekendQualifyingLoader = ({ params: { year, id: round }}) => {
  return {
    queryKey: ['listing', 'qualifyingResults', year, round],
    queryFn: () => WeekendQualifyingListing.query(year, round)
  }
}

export default weekendQualifyingLoader

// models
import WeekendQualifyingListing from "../../../../../model/listing/results/rounds/WeekendQualifyingListing"

export const weekendQualifyingQuery = ({ year, id: round }) => ({
  queryKey: ['listing', 'qualifyingResults', year, round],
  queryFn: () => WeekendQualifyingListing.query(year, round)
})

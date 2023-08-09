// models
import WeekendRaceListing from "../../../../../model/listing/results/rounds/WeekendRaceListing"

export const weekendRaceQuery = ({ year, id: round }) => ({
  queryKey: ['listing', 'raceResults', year, round],
  queryFn: () => WeekendRaceListing.query(year, round)
})

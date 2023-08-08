// models
import WeekendRaceListing from "../../../../model/listing/results/rounds/WeekendRaceListing"

export const weekendRaceLoader = ({ year, id: round }) => {
  return {
    queryKey: ['listing', 'raceResults', year, round],
    queryFn: () => WeekendRaceListing.query(year, round)
  }
}

// models
import WeekendRaceListing from "../../../../model/listing/results/rounds/WeekendRaceListing"

const weekendRaceLoader = ({ year, id: round }) => {
  return {
    queryKey: ['listing', 'raceResults', year, round],
    queryFn: () => WeekendRaceListing.query(year, round)
  }
}

export default weekendRaceLoader

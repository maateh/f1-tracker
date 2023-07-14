// models
import WeekendRaceListing from "../../../../../../model/listing/rounds/WeekendRaceListing"

const weekendRaceLoader = ({ params: { year, id: round }}) => {
  return {
    queryKey: ['listing', 'raceResults', year, round],
    queryFn: () => WeekendRaceListing.query(year, round)
  }
}

export default weekendRaceLoader

import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { constructorRacesResults } from '../../../../../../../api/results/race/constructorRacesResults'

// models
import SeasonModel from "../../../../../../../model/season/Season"
import QueryError from "../../../../../../../model/error/QueryError"

// icons
import SportsScoreIcon from '@mui/icons-material/SportsScore'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import Looks3Icon from '@mui/icons-material/Looks3'
import PlusOneIcon from '@mui/icons-material/PlusOne'

const useConstructorRacesQuery = () => {
  const { id } = useParams()

  return useQuery({
    queryKey: ['constructorRacesResults', id],
    queryFn: () => constructorRacesResults(id)
      .then(({ data }) => {
        if (!data.Races || !data.Races.length) {
          throw new QueryError('No data found!', 404)
        }

        const weekends = SeasonModel.parseWeekends({ Races: data.Races })

        return [
          {
            label: "Race starts",
            data: raceStarts(weekends),
            icon: <SportsScoreIcon />
          },
          {
            label: "Best race result",
            data: bestResult(weekends),
            icon: <StarBorderIcon />
          },
          {
            label: "Races won",
            data: racesWon(weekends),
            icon: <EmojiEventsIcon />
          },
          {
            label: "Podium finishes",
            data: podiums(weekends),
            icon: <Looks3Icon />
          },
          {
            label: "Finished in scoring positions",
            data: scoringPositions(weekends),
            icon: <PlusOneIcon />
          }
        ]
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  })
}

function raceStarts(weekends) {
  return `x${weekends.length}`
}

function bestResult(weekends) {
  return '#' + weekends.reduce((prevPos, curr) => {
    const currPos = curr.results.race[0].position
    return Math.min(prevPos, currPos)
  }, weekends[0].results.race[0].position)
}

function racesWon(weekends) {
  return 'x' + weekends.reduce((acc, curr) => {
    return +curr.results.race[0].position === 1
      ? acc + 1
      : acc
  }, 0)
}

function podiums(weekends) {
  return 'x' + weekends.reduce((acc, curr) => {
    const results = curr.results.race.filter(result => result.position <= 3)
    return results.length + acc
  }, 0)
}

function scoringPositions(weekends) {
  return 'x' + weekends.reduce((acc, curr) => {
    const results = curr.results.race.filter(result => result.points > 0)
    return results.length + acc
  }, 0)
}

export default useConstructorRacesQuery

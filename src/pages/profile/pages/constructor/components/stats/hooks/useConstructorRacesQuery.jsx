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
        const winsAmount = racesWon(weekends)
        const podiumsAmount = podiums(weekends)

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
            data: `x${winsAmount}`,
            icon: <EmojiEventsIcon />
          },
          {
            label: "Win rate",
            data: calculateRate(weekends, winsAmount),
            icon: <EmojiEventsIcon />
          },
          {
            label: "Podium finishes (at least 1 driver)",
            data: `x${podiumsAmount}`,
            icon: <Looks3Icon />
          },
          {
            label: "Double podium finishes",
            data: `x${podiums(weekends, true)}`,
            icon: <Looks3Icon />
          },
          {
            label: "Podium rate (at least 1 driver)",
            data: calculateRate(weekends, podiumsAmount),
            icon: <Looks3Icon />
          },
          {
            label: "Finished in scoring positions",
            data: `x${scoringPositions(weekends)}`,
            icon: <PlusOneIcon />
          },
          {
            label: "Scoring rate (at least 1 driver)",
            data: calculateRate(weekends, scoringPositions(weekends, true)),
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
  return weekends.reduce((acc, curr) => {
    return +curr.results.race[0].position === 1
      ? acc + 1
      : acc
  }, 0)
}

function podiums(weekends, double = false) {
  return weekends.reduce((acc, curr) => {
    const results = curr.results.race.filter(result => result.position <= 3)
    return results.length && double ? acc + 1 : results.length + acc
  }, 0)
}

function scoringPositions(weekends, atLeastOne = false) {
  return weekends.reduce((acc, curr) => {
    const results = curr.results.race.filter(result => result.points > 0)
    return results.length && atLeastOne ? acc + 1 : results.length + acc
  }, 0)
}

function calculateRate(weekends, amount) {
  return (+amount / +weekends.length * 100).toFixed(2) + '%'
}

export default useConstructorRacesQuery

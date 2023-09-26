import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { driverRacesResults } from '../../../../../../../api/results/race/driverRacesResults'

// models
import SeasonModel from "../../../../../../../model/season/Season"
import QueryError from "../../../../../../../model/error/QueryError"

// icons
import SportsScoreIcon from '@mui/icons-material/SportsScore'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import Looks3Icon from '@mui/icons-material/Looks3'
import PlusOneIcon from '@mui/icons-material/PlusOne'

const useDriverRacesStatsQuery = () => {
  const { id } = useParams()

  return useQuery({
    queryKey: ['driverRacesResults', id],
    queryFn: () => driverRacesResults(id)
      .then(({ data }) => {
        if (!data.Races || !data.Races.length) {
          throw new QueryError('No data found!', 404)
        }

        const weekends = SeasonModel.parseWeekends({ Races: data.Races })
        const winsAmount = racesWon(weekends)
        const podiumsAmount = podiums(weekends)
        const scoringPosAmount = scoringPositions(weekends)

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
            data: winsAmount
              ? `x${winsAmount} | ${calculateRate(weekends, winsAmount)}`
              : '-',
            icon: <EmojiEventsIcon />
          },
          {
            label: "Podium finishes",
            data: podiumsAmount
              ? `x${podiumsAmount} | ${calculateRate(weekends, podiumsAmount)}`
              : '-',
            icon: <Looks3Icon />
          },
          {
            label: "Finished in scoring positions",
            data: scoringPosAmount
              ? `x${scoringPosAmount} | ${calculateRate(weekends, scoringPosAmount)}`
              : '-',
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

function podiums(weekends) {
  return weekends.reduce((acc, curr) => {
    return +curr.results.race[0].position <= 3
      ? acc + 1
      : acc
  }, 0)
}

function scoringPositions(weekends) {
  return weekends.reduce((acc, curr) => {
    return +curr.results.race[0].points > 0
      ? acc + 1
      : acc
  }, 0)
}

function calculateRate(weekends, amount) {
  return (+amount / +weekends.length * 100).toFixed(2) + '%'
}

export default useDriverRacesStatsQuery

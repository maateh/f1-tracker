import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useErrorBoundary } from "react-error-boundary"

// api
import { constructorRacesResults } from '../../../../../../../api/results/race/constructorRacesResults'

// context
import useConstructorProfileContext from "../../../context/hooks/useConstructorProfileContext"

// icons
import SportsScoreIcon from '@mui/icons-material/SportsScore'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import Looks3Icon from '@mui/icons-material/Looks3'
import ChecklistIcon from '@mui/icons-material/Checklist'
import PlusOneIcon from '@mui/icons-material/PlusOne'

const useConstructorRacesStatsQuery = () => {
  const { showBoundary } = useErrorBoundary()
  const { setRaces } = useConstructorProfileContext()
  const { id } = useParams()

  return useQuery({
    queryKey: ['constructorRacesResults', id],
    queryFn: () => constructorRacesResults(id)
      .then(({ weekends }) => {
        setRaces({ races: weekends })

        const winsAmount = racesWon(weekends)
        const doublePodiumsAmount = podiums(weekends, true)
        const podiumsAmount = podiums(weekends)
        const doubleScoringPosAmount = scoringPositions(weekends)
        const scoringPosAmount = scoringPositions(weekends, true)

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
            label: "Double podium finishes",
            data: doublePodiumsAmount
              ? `x${doublePodiumsAmount} | ${calculateRate(weekends, doublePodiumsAmount)}`
              : '-',
            icon: <Looks3Icon />
          },
          {
            label: "Podium finishes (at least 1 driver)",
            data: podiumsAmount
              ? `x${podiumsAmount} | ${calculateRate(weekends, podiumsAmount)}`
              : '-',
            icon: <Looks3Icon />
          },
          {
            label: "Finished in scoring positions (both drivers)",
            data: doubleScoringPosAmount
              ? `x${doubleScoringPosAmount} | ${calculateRate(weekends, doubleScoringPosAmount)}`
              : '-',
            icon: <ChecklistIcon />
          },
          {
            label: "Finished in scoring positions (at least 1 driver)",
            data: scoringPosAmount
              ? `x${scoringPosAmount} | ${calculateRate(weekends, scoringPosAmount)}`
              : '-',
            icon: <PlusOneIcon />
          }
        ]
      }),
    onError: err => showBoundary(err)
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
    const results = atLeastOne
      ? curr.results.race.some(result => result.points > 0)
      : curr.results.race.every(result => result.points > 0)
    return results ? acc + 1 : acc
  }, 0)
}

function calculateRate(weekends, amount) {
  return (+amount / +weekends.length * 100).toFixed(2) + '%'
}

export default useConstructorRacesStatsQuery

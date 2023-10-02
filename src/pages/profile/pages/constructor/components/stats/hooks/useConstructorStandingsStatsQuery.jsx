import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { constructorStandings } from '../../../../../../../api/standings/constructor/constructorStandings'

// context
import useConstructorProfileContext from "../../../context/hooks/useConstructorProfileContext"

// icons
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import FlagCircleIcon from '@mui/icons-material/FlagCircle'
import StarsIcon from '@mui/icons-material/Stars'
import KeyboardCapslockIcon from '@mui/icons-material/KeyboardCapslock'
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate'

const useConstructorStandingsStatsQuery = () => {
  const { setStandingsList } = useConstructorProfileContext()
  const { id } = useParams()

  return useQuery({
    queryKey: ['constructorStandings', id],
    queryFn: () => constructorStandings(id)
      .then(({ standingsList }) => {
        setStandingsList({ standingsList })

        return [
          {
            label: "Championships won",
            data: championshipsWon(standingsList),
            icon: <EmojiEventsIcon />
          },
          {
            label: "Participate in a season",
            data: participations(standingsList),
            icon: <FlagCircleIcon />
          },
          {
            label: "Best championship standings result",
            data: bestResult(standingsList),
            icon: <StarsIcon />
          },
          {
            label: "Highest points of a season",
            data: highestPoints(standingsList),
            icon: <KeyboardCapslockIcon />
          },
          {
            label: "Total points",
            data: totalPoints(standingsList),
            icon: <ControlPointDuplicateIcon />
          }
        ]
      })
  })
}

function championshipsWon(standingsList) {
  const amount = standingsList.reduce((acc, curr) => {
    return +curr.constructors[0].position === 1
      ? acc + 1
      : acc
  }, 0)
  return amount === 0 ? '-' : `x${amount}`
}

function participations(standingsList) {
  return 'x' + standingsList.length
}

function bestResult(standingsList) {
  return '#' + standingsList.reduce((prevPos, curr) => {
    const currPos = +curr.constructors[0].position
    return Math.min(prevPos, currPos)
  }, +standingsList[0].constructors[0].position)
}

function highestPoints(standingsList) {
  const standings = standingsList.reduce((prev, curr) => {
    const prevPoints = +prev.constructors[0].points
    const currPoints = +curr.constructors[0].points
    return prevPoints > currPoints ? prev : curr
  })
  const points = +standings.constructors[0].points
  return points ? `${points} points (${standings.year})` : '-'
}

function totalPoints(standingsList) {
  const points = standingsList.reduce((acc, curr) => {
    return acc + +curr.constructors[0].points
  }, +standingsList[0].constructors[0].points)
  return points ? `${points} points` : '-'
}

export default useConstructorStandingsStatsQuery

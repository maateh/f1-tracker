import { useErrorBoundary } from "react-error-boundary"

// context
import useDriverProfileContext from "../../../context/hooks/useDriverProfileContext"

// icons
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import FlagCircleIcon from '@mui/icons-material/FlagCircle'
import StarsIcon from '@mui/icons-material/Stars'
import KeyboardCapslockIcon from '@mui/icons-material/KeyboardCapslock'
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate'

const useDriverStandingsStats = () => {
  const { showBoundary } = useErrorBoundary()
  const { standingsList: {
    data: standingsList, isLoading, isError, error
  }} = useDriverProfileContext()

  if (isError) showBoundary(error)
  if (isLoading || !standingsList) {
    return {
      stats: null,
      isLoading
    }
  }

  return {
    stats: [
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
    ],
    isLoading
  }
}

function championshipsWon(standingsList) {
  const amount = standingsList.reduce((acc, curr) => {
    return +curr.drivers[0].position === 1
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
    const currPos = +curr.drivers[0].position
    return Math.min(prevPos, currPos)
  }, +standingsList[0].drivers[0].position)
}

function highestPoints(standingsList) {
  const standings = standingsList.reduce((prev, curr) => {
    const prevPoints = +prev.drivers[0].points
    const currPoints = +curr.drivers[0].points
    return prevPoints > currPoints ? prev : curr
  })
  const points = +standings.drivers[0].points
  return points ? `${points} points (${standings.year})` : '-'
}

function totalPoints(standingsList) {
  const points = standingsList.reduce((acc, curr) => {
    return acc + +curr.drivers[0].points
  }, +standingsList[0].drivers[0].points)
  return points ? `${points} points` : '-'
}

export default useDriverStandingsStats

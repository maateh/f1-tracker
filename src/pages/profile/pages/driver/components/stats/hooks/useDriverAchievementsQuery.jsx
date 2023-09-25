import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { driverStandings } from '../../../../../../../api/standings/driver/driverStandings'

// context
import useDriverProfileContext from "../../../context/hooks/useDriverProfileContext"

// models
import SeasonModel from "../../../../../../../model/season/Season"
import QueryError from "../../../../../../../model/error/QueryError"

// icons
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import FlagCircleIcon from '@mui/icons-material/FlagCircle'
import StarsIcon from '@mui/icons-material/Stars'

const useDriverAchievementsQuery = () => {
  const { setStandingsList } = useDriverProfileContext()
  const { id } = useParams()

  return useQuery({
    queryKey: ['driverStandings', id],
    queryFn: () => driverStandings(id)
      .then(({ data }) => {
        if (!data.StandingsLists || !data.StandingsLists.length) {
          throw new QueryError('No data found!', 404)
        }

        // TODO: parse instead of dispatch
        // This dispatch is necessary here (because of listing)
        const standingsList = SeasonModel.parseStandings({
					StandingsLists: data.StandingsLists,
				})
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
          }
        ]
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  })
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
  return '#' + standingsList.reduce((prev, curr) => {
    const prevPos = isNaN(prev) ? prev.drivers[0].position : prev
    const currPos = curr.drivers[0].position
    return Math.min(prevPos, currPos)
  })
}

export default useDriverAchievementsQuery

import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { constructorStandings } from '../../../../../../../api/standings/constructor/constructorStandings'

// context
import useConstructorProfileContext from "../../../context/hooks/useConstructorProfileContext"

// models
import SeasonModel from "../../../../../../../model/season/Season"
import QueryError from "../../../../../../../model/error/QueryError"

// icons
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import FlagCircleIcon from '@mui/icons-material/FlagCircle'
import StarsIcon from '@mui/icons-material/Stars'

const useConstructorAchievementsQuery = () => {
  const { setStandingsList } = useConstructorProfileContext()
  const { id } = useParams()

  return useQuery({
    queryKey: ['constructorStandings', id],
    queryFn: () => constructorStandings(id)
      .then(({ data }) => {
        if (!data.StandingsLists || !data.StandingsLists.length) {
          throw new QueryError('No data found!', 404)
        }

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
  return '#' + standingsList.reduce((prev, curr) => {
    const prevPos = isNaN(prev) ? prev.constructors[0].position : prev
    const currPos = curr.constructors[0].position
    return Math.min(prevPos, currPos)
  })
}

export default useConstructorAchievementsQuery

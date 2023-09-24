import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { driverStandings } from '../../../../../../../api/standings/driver/driverStandings'

// context
import useDriverProfileContext from "../../../context/hooks/useDriverProfileContext"

// models
import SeasonModel from "../../../../../../../model/season/Season"
import QueryError from "../../../../../../../model/error/QueryError"

const useDriverAchievementsQuery = () => {
  const { setStandings } = useDriverProfileContext()
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
        setStandings({
          standings: SeasonModel.parseStandings({ StandingsLists: data.StandingsLists })
        })
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  })
}

export default useDriverAchievementsQuery

import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { constructorStandings } from '../../../../../../../api/standings/constructor/constructorStandings'

// context
import useConstructorProfileContext from "../../../context/hooks/useConstructorProfileContext"

// models
import SeasonModel from "../../../../../../../model/season/Season"
import QueryError from "../../../../../../../model/error/QueryError"

const useConstructorAchievementsQuery = () => {
  const { setStandings } = useConstructorProfileContext()
  const { id } = useParams()

  return useQuery({
    queryKey: ['constructorStandings', id],
    queryFn: () => constructorStandings(id)
      .then(({ data }) => {
        if (!data.StandingsLists || !data.StandingsLists.length) {
          throw new QueryError('No data found!', 404)
        }

        setStandings({
          standings: SeasonModel.parseStandings({ StandingsLists: data.StandingsLists })
        })
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  })
}

export default useConstructorAchievementsQuery

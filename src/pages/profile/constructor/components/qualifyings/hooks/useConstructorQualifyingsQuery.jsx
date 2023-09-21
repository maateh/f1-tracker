import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { constructorQualifyingsResults } from '../../../../../../api/results/qualifying/constructorQualifyingsResults'

// context
import useConstructorProfileContext from "../../../context/hooks/useConstructorProfileContext"

// models
import SeasonModel from "../../../../../../model/season/Season"
import QueryError from "../../../../../../model/error/QueryError"

const useConstructorQualifyingsQuery = () => {
  const { setQualifyings } = useConstructorProfileContext()
  const { id } = useParams()

  return useQuery({
    queryKey: ['constructorQualifyingsResults', id],
    queryFn: () => constructorQualifyingsResults(id)
      .then(({ data }) => {
        if (!data.Races || !data.Races.length) {
          throw new QueryError('No data found!', 404)
        }

        setQualifyings({
          qualifyings: SeasonModel.parseWeekends({ Races: data.Races })
        })
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  })
}

export default useConstructorQualifyingsQuery

import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { constructorQualifyingsResults } from '../../../../../../../api/results/qualifying/constructorQualifyingsResults'

// models
import SeasonModel from "../../../../../../../model/season/Season"
import QueryError from "../../../../../../../model/error/QueryError"

const useConstructorQualifyingsQuery = () => {
  const { id } = useParams()

  return useQuery({
    queryKey: ['constructorQualifyingsResults', id],
    queryFn: () => constructorQualifyingsResults(id)
      .then(({ data }) => {
        if (!data.Races || !data.Races.length) {
          throw new QueryError('No data found!', 404)
        }

        // TODO: parse data then return this instead of dispatch
        // setQualifyings({
        //   qualifyings: SeasonModel.parseWeekends({ Races: data.Races })
        // })
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  })
}

export default useConstructorQualifyingsQuery

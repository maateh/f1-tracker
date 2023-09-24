import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { constructorRacesResults } from '../../../../../../../api/results/race/constructorRacesResults'

// models
import SeasonModel from "../../../../../../../model/season/Season"
import QueryError from "../../../../../../../model/error/QueryError"

const useConstructorRacesQuery = () => {
  const { id } = useParams()

  return useQuery({
    queryKey: ['constructorRacesResults', id],
    queryFn: () => constructorRacesResults(id)
      .then(({ data }) => {
        if (!data.Races || !data.Races.length) {
          throw new QueryError('No data found!', 404)
        }

        // TODO: parse data and return instead of dispatch
        // setRaces({
        //   races: SeasonModel.parseWeekends({ Races: data.Races })
        // })
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  })
}

export default useConstructorRacesQuery

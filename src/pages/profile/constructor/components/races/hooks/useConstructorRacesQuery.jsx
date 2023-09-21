import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { constructorRacesResults } from '../../../../../../api/results/race/constructorRacesResults'

// context
import useConstructorProfileContext from "../../../context/hooks/useConstructorProfileContext"

// models
import SeasonModel from "../../../../../../model/season/Season"
import QueryError from "../../../../../../model/error/QueryError"

const useConstructorRacesQuery = () => {
  const { setRaces } = useConstructorProfileContext()
  const { id } = useParams()

  return useQuery({
    queryKey: ['constructorRacesResults', id],
    queryFn: () => constructorRacesResults(id)
      .then(({ data }) => {
        if (!data.Races || !data.Races.length) {
          throw new QueryError('No data found!', 404)
        }

        setRaces({
          races: SeasonModel.parseWeekends({ Races: data.Races })
        })
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  })
}

export default useConstructorRacesQuery

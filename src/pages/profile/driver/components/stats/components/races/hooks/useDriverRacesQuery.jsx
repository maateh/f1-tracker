import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { driverRacesResults } from '../../../../../../../../api/results/race/driverRacesResults'

// context
import useDriverProfileContext from "../../../../../context/hooks/useDriverProfileContext"

// models
import SeasonModel from "../../../../../../../../model/season/Season"
import QueryError from "../../../../../../../../model/error/QueryError"

const useDriverRacesQuery = () => {
  const { setRaces } = useDriverProfileContext()
  const { id } = useParams()

  return useQuery({
    queryKey: ['driverRacesResults', id],
    queryFn: () => driverRacesResults(id)
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

export default useDriverRacesQuery

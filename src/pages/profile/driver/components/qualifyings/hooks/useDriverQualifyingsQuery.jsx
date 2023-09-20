import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { driverQualifyingsResults } from '../../../../../../api/results/qualifying/driverQualifyingsResults'

// context
import useDriverProfileContext from "../../../context/hooks/useDriverProfileContext"

// models
import SeasonModel from "../../../../../../model/season/Season"
import QueryError from "../../../../../../model/error/QueryError"

const useDriverQualifyingsQuery = () => {
  const { setQualifyings } = useDriverProfileContext()
  const { id } = useParams()

  return useQuery({
    queryKey: ['driverQualifyingsResults', id],
    queryFn: () => driverQualifyingsResults(id)
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

export default useDriverQualifyingsQuery

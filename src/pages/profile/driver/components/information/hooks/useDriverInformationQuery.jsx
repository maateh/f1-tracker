import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { driver } from '../../../../../../api/drivers/driver'

// models
import DriverModel from "../../../../../../model/season/weekend/results/driver/Driver"
import QueryError from "../../../../../../model/error/QueryError"
import useDriverProfileContext from "../../../context/hooks/useDriverProfileContext"
import { SET_DRIVER } from "../../../context/DriverProfileContextActions"

const useDriverInformationQuery = () => {
  const { dispatch } = useDriverProfileContext()
  const { id } = useParams()

  return useQuery({
    queryKey: ['driver', id],
    queryFn: () => driver(id)
      .then(({ data }) => {
        if (!data.Drivers || !data.Drivers.length) {
          throw new QueryError('No data found!', 404)
        }

        dispatch({
          type: SET_DRIVER,
          payload: DriverModel.parser({ Driver: data.Drivers[0] })
        })
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  })
}

export default useDriverInformationQuery

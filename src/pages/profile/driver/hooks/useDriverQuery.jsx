import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { driver } from '../../../../api/drivers/driver'

// models
import DriverModel from "../../../../model/season/weekend/results/driver/Driver"
import QueryError from "../../../../model/error/QueryError"

const useDriverQuery = () => {
  const { id } = useParams()

  return useQuery({
    queryKey: ['driver', id],
    queryFn: () => driver(id)
    .then(({ data }) => {
      if (!data.Drivers || !data.Drivers.length) {
        throw new QueryError('No data found!', 404)
      }

      return DriverModel.parser({ Driver: data.Drivers[0] })
    })
    .catch(err => {
      throw new QueryError(err.message, err.code)
    })
  })
}

export default useDriverQuery
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { circuit } from "../../../../api/circuits/circuit"

// models
import CircuitModel from "../../../../model/season/weekend/circuit/Circuit"
import QueryError from "../../../../model/error/QueryError"

const useCircuitQuery = () => {
  const { id } = useParams()

  return useQuery({
    queryKey: ['circuit', id],
    queryFn: () => circuit(id)
    .then(({ data }) => {
      if (!data.Circuits || !data.Circuits.length) {
        throw new QueryError('No data found!', 404)
      }

      return CircuitModel.parser({ Circuit: data.Circuits[0] })
    })
    .catch(err => {
      throw new QueryError(err.message, err.code)
    })
  })
}

export default useCircuitQuery
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { circuit } from "../../../../../../api/circuits/circuit"
import { circuitRaces } from "../../../../../../api/circuits/races/circuitRaces"

// context
import useCircuitProfileContext from "../../../context/hooks/useCircuitProfileContext"

// models
import CircuitModel from "../../../../../../model/season/weekend/circuit/Circuit"
import QueryError from "../../../../../../model/error/QueryError"

const useCircuitInformationQuery = () => {
  const { setCircuit, setRacesAmount } = useCircuitProfileContext()
  const { id } = useParams()

  return useQuery({
    queryKey: ['circuit', 'circuitRaces', id],
    queryFn: () => Promise.all([
      circuit(id), 
      circuitRaces(id, { offset: 0, limit: 0 })
    ])
      .then(([{ data }, { info }]) => {
        if (!data.Circuits || !data.Circuits.length) {
          throw new QueryError('No data found!', 404)
        }

        setCircuit({
          circuit: CircuitModel.parser({ Circuit: data.Circuits[0] })
        })

        setRacesAmount({
          racesAmount: info.total
        })
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  })
}

export default useCircuitInformationQuery

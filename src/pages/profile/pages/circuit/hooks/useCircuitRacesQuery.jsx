import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

// api
import { circuitRaces } from '../../../../../api/circuits/races/circuitRaces'

const useCircuitRacesQuery = () => {
  const { id } = useParams()

  return useQuery({
    queryKey: ['circuitRaces', id],
    queryFn: () => circuitRaces(id)
      .then(({ weekends }) => weekends),
    onError: err => {
      showBoundary(err)
    }
  })
}

export default useCircuitRacesQuery

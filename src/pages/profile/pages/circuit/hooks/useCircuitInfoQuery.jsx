import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useErrorBoundary } from "react-error-boundary"

// api
import { circuit } from "../../../../../api/circuits/circuit"

// hooks
import useToaster from '../../../../../components/toaster/hooks/useToaster'

const useCircuitInfoQuery = () => {
  const { id } = useParams()
  const { showBoundary } = useErrorBoundary()
  const { errorToast } = useToaster()

  return useQuery({
    queryKey: ['circuit', id],
    queryFn: () => circuit(id)
      .then(({ circuit }) => circuit),
    onError: err => {
      errorToast("Couldn't find any data with the requested circuit ID. Please go back and try to select another circuit.")
      showBoundary(err)
    }
  })
}

export default useCircuitInfoQuery

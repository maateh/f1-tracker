import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useErrorBoundary } from "react-error-boundary"

// api
import { driver } from '../../../../../api/drivers/driver'

// hooks
import useToaster from '../../../../../components/toaster/hooks/useToaster'

const useDriverInfoQuery = () => {
  const { id } = useParams()
  const { showBoundary } = useErrorBoundary()
  const { errorToast } = useToaster()

  return useQuery({
    queryKey: ['driver', id],
    queryFn: () => driver(id)
      .then(({ driver }) => driver),
    onError: err => {
      errorToast("Couldn't find any data with the requested driver ID. Please go back and try to select another driver.")
      showBoundary(err)
    }
  })
}

export default useDriverInfoQuery

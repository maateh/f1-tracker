import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useErrorBoundary } from "react-error-boundary"

// api
import { driver } from '../../../../../api/drivers/driver'

const useDriverQuery = () => {
  const { id } = useParams()
  const { showBoundary } = useErrorBoundary()

  return useQuery({
    queryKey: ['driver', id],
    queryFn: () => driver(id)
      .then(({ driver }) => driver),
    onError: err => showBoundary(err)
  })
}

export default useDriverQuery

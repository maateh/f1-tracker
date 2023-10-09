import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useErrorBoundary } from "react-error-boundary"

// api
import { constructor } from '../../../../../api/constructors/constructor'

// hooks
import useToaster from '../../../../../components/toaster/hooks/useToaster'

const useConstructorQuery = () => {
  const { id } = useParams()
  const { showBoundary } = useErrorBoundary()
  const { errorToast } = useToaster()

  return useQuery({
    queryKey: ['constructor', id],
    queryFn: () => constructor(id)
      .then(({ constructor }) => constructor),
    onError: err => {
      // TODO
      errorToast('error message here')
      showBoundary(err)
    }
  })
}

export default useConstructorQuery

import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useErrorBoundary } from "react-error-boundary"

// api
import { constructor } from '../../../../../api/constructors/constructor'

// hooks
import useToaster from '../../../../../components/toaster/hooks/useToaster'

const useConstructorInfoQuery = () => {
  const { id } = useParams()
  const { showBoundary } = useErrorBoundary()
  const { errorToast } = useToaster()

  return useQuery({
    queryKey: ['constructor', id],
    queryFn: () => constructor(id)
      .then(({ constructor }) => constructor),
    onError: err => {
      errorToast("Couldn't find any data with the requested constructor ID. Please go back and try to select another constructor.")
      showBoundary(err)
    }
  })
}

export default useConstructorInfoQuery

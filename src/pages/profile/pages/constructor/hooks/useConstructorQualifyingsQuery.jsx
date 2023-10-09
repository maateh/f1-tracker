import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useErrorBoundary } from "react-error-boundary"

// api
import { constructorQualifyingsResults } from '../../../../../api/results/qualifying/constructorQualifyingsResults'

// hooks
import useToaster from "../../../../../components/toaster/hooks/useToaster"

const useConstructorQualifyingsQuery = () => {
  const { id } = useParams()
  const { showBoundary } = useErrorBoundary()
  const { warningToast } = useToaster()

  return useQuery({
    queryKey: ['constructorQualifyingsResults', id],
    queryFn: () => constructorQualifyingsResults(id)
      .then(({ weekends }) => weekends),
    onError: err => {
      warningToast("The constructor doesn't have any qualifying results data.")
      // showBoundary(err)
    }
  })
}

export default useConstructorQualifyingsQuery

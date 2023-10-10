import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { constructorQualifyingsResults } from '../../../../../api/results/qualifying/constructorQualifyingsResults'

// hooks
import useToaster from "../../../../../components/toaster/hooks/useToaster"

const useConstructorQualifyingsResultsQuery = () => {
  const { id } = useParams()
  const { warningToast } = useToaster()

  return useQuery({
    queryKey: ['constructorQualifyingsResults', id],
    queryFn: () => constructorQualifyingsResults(id)
      .then(({ weekends }) => weekends),
    onError: () => {
      warningToast("The constructor doesn't have any qualifying results data.")
    }
  })
}

export default useConstructorQualifyingsResultsQuery

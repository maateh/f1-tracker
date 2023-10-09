import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { driverQualifyingsResults } from '../../../../../api/results/qualifying/driverQualifyingsResults'

// hooks
import useToaster from "../../../../../components/toaster/hooks/useToaster"

const useDriverQualifyingsQuery = () => {
  const { id } = useParams()
  const { warningToast } = useToaster()

  return useQuery({
    queryKey: ['driverQualifyingsResults', id],
    queryFn: () => driverQualifyingsResults(id)
      .then(({ weekends }) => weekends),
    onError: () => {
      warningToast("The driver doesn't have any qualifying results data.")
    }
  })
}

export default useDriverQualifyingsQuery

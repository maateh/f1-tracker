import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { driverRacesResults } from '../../../../../api/results/race/driverRacesResults'

// hooks
import useToaster from "../../../../../components/toaster/hooks/useToaster"

const useDriverRacesQuery = () => {
  const { id } = useParams()
  const { warningToast } = useToaster()

  return useQuery({
    queryKey: ['driverRacesResults', id],
    queryFn: () => driverRacesResults(id)
      .then(({ weekends }) => weekends),
    onError: () => {
      warningToast("The driver doesn't have any race results data.")
    }
  })
}

export default useDriverRacesQuery

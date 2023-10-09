import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { constructorRacesResults } from '../../../../../api/results/race/constructorRacesResults'

// hooks
import useToaster from "../../../../../components/toaster/hooks/useToaster"

const useConstructorRacesQuery = () => {
  const { id } = useParams()
  const { warningToast } = useToaster()

  return useQuery({
    queryKey: ['constructorRacesResults', id],
    queryFn: () => constructorRacesResults(id)
      .then(({ weekends }) => weekends),
    onError: () => {
      warningToast("The constructor doesn't have any race results data.")
    }
  })
}

export default useConstructorRacesQuery

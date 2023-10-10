import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useErrorBoundary } from "react-error-boundary"

// api
import { constructorStandings } from '../../../../../api/standings/constructor/constructorStandings'

// hooks
import useToaster from "../../../../../components/toaster/hooks/useToaster"

const useConstructorStandingsListQuery = () => {
  const { id } = useParams()
  const { warningToast } = useToaster()

  return useQuery({
    queryKey: ['constructorStandings', id],
    queryFn: () => constructorStandings(id)
      .then(({ standingsList }) => standingsList),
    onError: () => {
      warningToast("The constructor doesn't have any championship standings data.")
    }
  })
}

export default useConstructorStandingsListQuery

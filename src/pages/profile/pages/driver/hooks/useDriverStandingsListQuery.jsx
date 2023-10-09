import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { driverStandings } from '../../../../../api/standings/driver/driverStandings'

// hooks
import useToaster from "../../../../../components/toaster/hooks/useToaster"

const useDriverStandingsListQuery = () => {
  const { id } = useParams()
  const { warningToast } = useToaster()

  return useQuery({
    queryKey: ['driverStandings', id],
    queryFn: () => driverStandings(id)
      .then(({ standingsList }) => standingsList),
    onError: () => warningToast("The driver doesn't have any championship standings data.")
  })
}

export default useDriverStandingsListQuery
